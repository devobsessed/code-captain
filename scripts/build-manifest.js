#!/usr/bin/env node

import { execSync } from "child_process";
import crypto from "crypto";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

class ManifestBuilder {
  constructor() {
    this.version = this.getVersion();
    this.commit = this.getCommitHash();
    this.timestamp = new Date().toISOString();

    // Define all Code Captain file patterns
    this.filePatterns = {
      // Cursor files
      "cursor/cc.mdc": {
        component: "rules",
        description: "Cursor AI agent rules",
      },
      "cursor/cc.md": {
        component: "commands",
        description: "Core Code Captain reference",
      },
      "cursor/commands/*.md": { component: "commands" },

      "cursor/docs/*.md": { component: "docs" },

      // Copilot files
      "copilot/copilot-instructions.md": { component: "instructions" },
      "copilot/agents/*.md": { component: "agents" },
      "copilot/prompts/*.md": { component: "prompts" },
      "copilot/docs/*.md": { component: "docs" },
      "copilot/Directory.Build.props": {
        component: "vs-solution",
        description: "MSBuild props for VS Solution Explorer visibility",
      },

      // Claude files
      "claude-code/agents/*.md": { component: "agents" },
      "claude-code/commands/*.md": { component: "claude-commands" },
    };
  }

  // Get version from package.json
  getVersion() {
    try {
      const packageJson = fs.readJsonSync(path.join(rootDir, "package.json"));
      return packageJson.version || "1.0.0";
    } catch (error) {
      console.warn("Could not read package.json version, using 1.0.0");
      return "1.0.0";
    }
  }

  // Get current git commit hash
  getCommitHash() {
    try {
      return execSync("git rev-parse HEAD", {
        cwd: rootDir,
        encoding: "utf8",
      }).trim();
    } catch (error) {
      console.warn("Could not get git commit hash");
      return "unknown";
    }
  }

  // Generate SHA256 hash for file content
  async generateFileHash(filePath) {
    try {
      const content = await fs.readFile(filePath, "utf8");
      return crypto.createHash("sha256").update(content).digest("hex");
    } catch (error) {
      console.error(`Error hashing file ${filePath}:`, error.message);
      return null;
    }
  }

  // Get file stats
  async getFileStats(filePath) {
    try {
      const stats = await fs.stat(filePath);
      return {
        size: stats.size,
        lastModified: stats.mtime.toISOString(),
      };
    } catch (error) {
      return { size: 0, lastModified: new Date().toISOString() };
    }
  }

  // Expand glob patterns to actual files
  async expandPattern(pattern) {
    const files = [];

    if (pattern.includes("*")) {
      const [dir, glob] = pattern.split("*");
      const fullDir = path.join(rootDir, dir);

      if (await fs.pathExists(fullDir)) {
        const dirFiles = await fs.readdir(fullDir);
        const extension = glob || "";

        for (const file of dirFiles) {
          if (file.endsWith(extension)) {
            files.push(path.join(dir, file).replace(/\\/g, "/"));
          }
        }
      }
    } else {
      // Direct file path
      if (await fs.pathExists(path.join(rootDir, pattern))) {
        files.push(pattern);
      }
    }

    return files;
  }

  // Extract file description from content
  async extractDescription(filePath) {
    try {
      const content = await fs.readFile(path.join(rootDir, filePath), "utf8");

      // Look for description in markdown header or front matter
      const lines = content.split("\n").slice(0, 10); // Check first 10 lines

      for (const line of lines) {
        // Look for description in YAML front matter
        if (line.startsWith("description:")) {
          return line.replace("description:", "").trim().replace(/['"]/g, "");
        }

        // Look for description in comments
        if (line.includes("Description:")) {
          return line.split("Description:")[1].trim();
        }

        // Look for first meaningful sentence after title
        if (
          line.trim() &&
          !line.startsWith("#") &&
          !line.startsWith("---") &&
          line.length > 20
        ) {
          return (
            line.trim().substring(0, 100) + (line.length > 100 ? "..." : "")
          );
        }
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  // Generate changelog from git commits
  async generateChangelog() {
    try {
      // Get recent commits
      const commits = execSync(
        'git log --oneline --since="30 days ago" --grep="feat:\\|fix:\\|docs:" --pretty=format:"%h %s"',
        { cwd: rootDir, encoding: "utf8" }
      )
        .trim()
        .split("\n")
        .filter(Boolean);

      const changelog = {};

      // Group by version (simplified - you might want more sophisticated versioning)
      const versions = [this.version];

      changelog[this.version] = {
        date: new Date().toISOString().split("T")[0],
        changes: commits.slice(0, 10).map((commit) => {
          const [hash, ...message] = commit.split(" ");
          return message.join(" ").replace(/^(feat|fix|docs):\s*/, "");
        }),
      };

      return changelog;
    } catch (error) {
      console.warn("Could not generate changelog from git");
      return {
        [this.version]: {
          date: new Date().toISOString().split("T")[0],
          changes: ["Initial manifest generation"],
        },
      };
    }
  }

  // Build the complete manifest
  async buildManifest() {
    console.log("🔨 Building Code Captain manifest...");

    const manifest = {
      version: this.version,
      timestamp: this.timestamp,
      commit: this.commit,
      description: "Code Captain file manifest for change detection",
      files: {},
      changelog: await this.generateChangelog(),
    };

    let processedFiles = 0;

    // Process all file patterns
    for (const [pattern, config] of Object.entries(this.filePatterns)) {
      const files = await this.expandPattern(pattern);

      for (const file of files) {
        const fullPath = path.join(rootDir, file);

        console.log(`Processing: ${file}`);

        const [hash, stats, description] = await Promise.all([
          this.generateFileHash(fullPath),
          this.getFileStats(fullPath),
          this.extractDescription(file),
        ]);

        if (hash) {
          manifest.files[file] = {
            hash: `sha256:${hash}`,
            size: stats.size,
            lastModified: stats.lastModified,
            version: this.version,
            component: config.component,
            ...(description && { description }),
            ...(config.description &&
              !description && { description: config.description }),
          };

          processedFiles++;
        }
      }
    }

    console.log(`✅ Processed ${processedFiles} files`);
    return manifest;
  }

  // Save manifest to file
  async saveManifest(manifest) {
    const manifestPath = path.join(rootDir, "manifest.json");
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`📄 Manifest saved to ${manifestPath}`);
  }

  // Main build process
  async build() {
    try {
      const manifest = await this.buildManifest();
      await this.saveManifest(manifest);

      console.log("\n✨ Manifest build complete!");
      console.log(`Version: ${manifest.version}`);
      console.log(`Files tracked: ${Object.keys(manifest.files).length}`);
      console.log(`Commit: ${manifest.commit.substring(0, 8)}`);
    } catch (error) {
      console.error("❌ Manifest build failed:", error.message);
      process.exit(1);
    }
  }
}

// Run if called directly
const isMainModule =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMainModule) {
  const builder = new ManifestBuilder();
  builder.build();
}

export default ManifestBuilder;
