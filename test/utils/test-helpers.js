import glob from "fast-glob";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";

/**
 * Check if a file exists
 */
export async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Read and parse markdown file with frontmatter
 */
export async function parseMarkdownFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return matter(content);
  } catch (error) {
    throw new Error(`Failed to parse ${filePath}: ${error.message}`);
  }
}

/**
 * Get all command files for a platform
 */
export async function getCommandFiles(platform) {
  const patterns = {
    cursor: "cursor/commands/*.md",
    copilot: "copilot/prompts/*.prompt.md",
    claude: "claude-code/commands/*.md",
  };

  const pattern = patterns[platform];
  if (!pattern) {
    throw new Error(`Unknown platform: ${platform}`);
  }

  return await glob(pattern, { cwd: process.cwd() });
}

/**
 * Extract command name from file path
 */
export function extractCommandName(filePath) {
  const basename = path.basename(filePath);

  // Remove platform-specific extensions
  return basename
    .replace(/\.prompt\.md$/, "") // Copilot
    .replace(/\.md$/, "") // Others
    .replace(/^cc-/, ""); // Claude prefix
}

/**
 * Core commands that should exist on all platforms
 */
export const CORE_COMMANDS = [
  "create-spec",
  "edit-spec",
  "execute-task",
  "initialize",
  "plan-product",
  "research",
  "status",
  "create-adr",
  "explain-code",
  "new-command",
  "swab",
];

/**
 * Platform-specific configurations
 */
export const PLATFORM_CONFIG = {
  cursor: {
    directory: "cursor/commands",
    extension: ".md",
    prefix: "cc:",
    rulesFile: "cursor/cc.mdc",
  },
  copilot: {
    directory: "copilot/prompts",
    extension: ".prompt.md",
    prefix: "/",
    requiredFrontmatter: { agent: "Code Captain" },
  },
  claude: {
    directory: "claude-code/commands",
    extension: ".md",
    prefix: "/",
    allowPartial: true, // Claude doesn't have all commands yet
  },
};

/**
 * Validate frontmatter structure
 */
export function validateFrontmatter(data, platform) {
  const config = PLATFORM_CONFIG[platform];
  if (!config.requiredFrontmatter) return true;

  for (const [key, expectedType] of Object.entries(
    config.requiredFrontmatter
  )) {
    if (!(key in data)) {
      throw new Error(`Missing required frontmatter field: ${key}`);
    }

    if (expectedType === "string" && typeof data[key] !== "string") {
      throw new Error(`Field ${key} must be a string`);
    }

    if (Array.isArray(expectedType) && !expectedType.includes(data[key])) {
      throw new Error(
        `Field ${key} must be one of: ${expectedType.join(", ")}`
      );
    }
  }

  return true;
}

/**
 * Check if content follows contract-first approach
 */
export function hasContractFirstApproach(content) {
  const contractKeywords = [
    "contract",
    "no file creation",
    "clarification",
    "alignment",
  ];

  const lowerContent = content.toLowerCase();
  return contractKeywords.some((keyword) => lowerContent.includes(keyword));
}

/**
 * Extract structured sections from content
 */
export function extractSections(content) {
  const lines = content.split("\n");
  const sections = {};
  let currentSection = null;
  let currentContent = [];

  for (const line of lines) {
    if (line.startsWith("#")) {
      // Save previous section
      if (currentSection) {
        sections[currentSection] = currentContent.join("\n").trim();
      }
      // Start new section
      currentSection = line
        .replace(/^#+\s*/, "")
        .toLowerCase()
        .replace(/\s+/g, "_");
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  // Save last section
  if (currentSection) {
    sections[currentSection] = currentContent.join("\n").trim();
  }

  return sections;
}
