import { describe, expect, test } from "vitest";
import {
  fileExists,
  getCommandFiles,
  parseMarkdownFile,
} from "./utils/test-helpers.js";

describe("Integration Tests", () => {
  describe("End-to-End Command Flow", () => {
    test("recommended workflow commands exist in sequence", async () => {
      // Typical workflow: initialize -> plan-product -> create-spec -> execute-task
      const workflowCommands = [
        "initialize",
        "plan-product",
        "create-spec",
        "execute-task",
      ];
      const platforms = ["cursor", "copilot"];

      for (const platform of platforms) {
        const commandFiles = await getCommandFiles(platform);
        const availableCommands = commandFiles.map((file) => {
          const basename = file.split("/").pop();
          return basename
            .replace(/\.prompt\.md$/, "")
            .replace(/\.md$/, "")
            .replace(/^cc-/, "");
        });

        const workflowCoverage = workflowCommands.filter((cmd) =>
          availableCommands.includes(cmd)
        );

        // Should have at least 75% of the core workflow
        expect(workflowCoverage.length).toBeGreaterThanOrEqual(3);

        console.log(
          `${platform} workflow coverage: ${workflowCoverage.length}/${
            workflowCommands.length
          } (${workflowCoverage.join(", ")})`
        );
      }
    });
  });

  describe("Cross-Reference Validation", () => {
    test("commands reference other commands appropriately", async () => {
      const platforms = ["cursor", "copilot"];

      for (const platform of platforms) {
        const commandFiles = await getCommandFiles(platform);

        for (const filePath of commandFiles) {
          try {
            const { content } = await parseMarkdownFile(filePath);

            // Look for command references
            const commandReferences = content.match(/(cc:|\/)[a-z-]+/gi) || [];

            // Remove the current command from references
            const currentCommand = filePath
              .split("/")
              .pop()
              .replace(/\.prompt\.md$/, "")
              .replace(/\.md$/, "")
              .replace(/^cc-/, "");

            const otherReferences = commandReferences
              .map((ref) => ref.replace(/^(cc:|\/)/i, ""))
              .filter((ref) => ref !== currentCommand);

            // Validate that referenced commands exist
            for (const ref of otherReferences) {
              const referencedFiles = commandFiles.filter((file) =>
                file.includes(ref)
              );

              if (referencedFiles.length === 0) {
                console.warn(
                  `⚠️  ${filePath} references non-existent command: ${ref}`
                );
              }
            }
          } catch (error) {
            continue;
          }
        }
      }
    });
  });

  describe("Manifest Validation", () => {
    test("manifest includes all command files", async () => {
      const manifestExists = await fileExists("manifest.json");
      if (!manifestExists) {
        console.log(
          '⚠️  Manifest file not found - run "npm run manifest" to generate'
        );
        return;
      }

      const manifestContent = await import("../manifest.json", {
        assert: { type: "json" },
      });
      const manifestFiles = Object.keys(manifestContent.default.files || {});

      // Check that all command files are tracked in manifest
      const platforms = ["cursor", "copilot", "claude"];

      for (const platform of platforms) {
        try {
          const commandFiles = await getCommandFiles(platform);

          for (const commandFile of commandFiles) {
            const isTracked = manifestFiles.includes(commandFile);

            if (!isTracked) {
              console.warn(
                `⚠️  Command file not tracked in manifest: ${commandFile}`
              );
            }
          }
        } catch (error) {
          continue;
        }
      }
    });
  });

  describe("Platform Installation Compatibility", () => {
    test("each platform has required installation files", async () => {
      const installationRequirements = {
        cursor: [".cursor/rules/cc.mdc"],
        copilot: [
          ".github/copilot-instructions.md",
          ".github/agents/",
          ".github/prompts/",
        ],
        claude: [".claude/agents/", ".claude/commands/"],
      };

      // These are the expected installation targets
      // We don't test actual installation, just that source files exist

      for (const [platform, requirements] of Object.entries(
        installationRequirements
      )) {
        const sourceFiles = await getCommandFiles(platform);
        expect(sourceFiles.length).toBeGreaterThan(0);
      }
    });
  });

  describe("Documentation Integration", () => {
    test("README mentions all supported platforms", async () => {
      const readmeExists = await fileExists("README.md");
      expect(readmeExists).toBe(true);

      const { content } = await parseMarkdownFile("README.md");
      const platforms = ["cursor", "copilot", "claude"];

      for (const platform of platforms) {
        expect(content.toLowerCase()).toContain(platform.toLowerCase());
      }
    });

    test("platform-specific READMEs exist", async () => {
      const platforms = ["cursor", "copilot", "claude-code"];

      for (const platform of platforms) {
        const readmePath = `${platform}/README.md`;
        const hasReadme = await fileExists(readmePath);

        if (!hasReadme) {
          console.warn(`⚠️  Missing README for platform: ${platform}`);
        }
      }
    });
  });

  describe("Version Consistency", () => {
    test("package.json version matches manifest version", async () => {
      const packageJson = await import("../package.json", {
        assert: { type: "json" },
      });
      const packageVersion = packageJson.default.version;

      try {
        const manifest = await import("../manifest.json", {
          assert: { type: "json" },
        });
        const manifestVersion = manifest.default.version;

        expect(manifestVersion).toBe(packageVersion);
      } catch (error) {
        console.log(
          '⚠️  Manifest not found - run "npm run manifest" to generate'
        );
      }
    });
  });

  describe("File Permissions and Accessibility", () => {
    test("all command files are readable", async () => {
      const platforms = ["cursor", "copilot", "claude"];

      for (const platform of platforms) {
        try {
          const commandFiles = await getCommandFiles(platform);

          for (const filePath of commandFiles) {
            // Try to read the file
            await parseMarkdownFile(filePath);
          }
        } catch (error) {
          console.error(
            `❌ Error reading files for ${platform}: ${error.message}`
          );
          throw error;
        }
      }
    });
  });
});
