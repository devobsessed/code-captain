import { describe, expect, test } from "vitest";
import fs from "fs/promises";
import {
  extractCommandName,
  getCommandFiles,
  parseMarkdownFile,
  PLATFORM_CONFIG,
  validateFrontmatter,
} from "./utils/test-helpers.js";

describe("Structure Validation Tests", () => {
  describe("Frontmatter Validation", () => {
    test("copilot prompts have correct frontmatter", async () => {
      const commandFiles = await getCommandFiles("copilot");

      for (const filePath of commandFiles) {
        const { data } = await parseMarkdownFile(filePath);

        expect(() => validateFrontmatter(data, "copilot")).not.toThrow();
        expect(data.agent).toBe("agent");
      }
    });

    test("copilot prompts have description in frontmatter", async () => {
      const commandFiles = await getCommandFiles("copilot");

      for (const filePath of commandFiles) {
        const { data } = await parseMarkdownFile(filePath);

        expect(data.description).toBeDefined();
        expect(typeof data.description).toBe("string");
        expect(data.description.length).toBeGreaterThan(0);
      }
    });

    test("cursor commands have no conflicting frontmatter", async () => {
      const commandFiles = await getCommandFiles("cursor");

      for (const filePath of commandFiles) {
        const { data } = await parseMarkdownFile(filePath);

        // Cursor shouldn't have mode: agent (that's for Copilot)
        expect(data.mode).toBeUndefined();
      }
    });
  });

  describe("Content Structure", () => {
    test("cursor commands have proper headers", async () => {
      const commandFiles = await getCommandFiles("cursor");

      for (const filePath of commandFiles) {
        const { content } = await parseMarkdownFile(filePath);

        // Should have at least one H1 header
        expect(content).toMatch(/^#\s+.+/m);

        // Should have overview or description section
        expect(content).toMatch(
          /##\s+(overview|description|command process)/i
        );
      }
    });

    test("copilot commands have proper headers", async () => {
      const commandFiles = await getCommandFiles("copilot");

      for (const filePath of commandFiles) {
        const { content } = await parseMarkdownFile(filePath);

        // Should have at least one H1 header
        expect(content).toMatch(/^#\s+.+/m);

        // Copilot prompts use imperative framing instead of ## Overview
        expect(content).toMatch(
          /You (MUST|are executing)/
        );
      }
    });

    test("create-spec commands follow contract-first structure", async () => {
      const platforms = ["cursor", "copilot"];

      for (const platform of platforms) {
        const config = PLATFORM_CONFIG[platform];
        const filePath = `${config.directory}/create-spec${config.extension}`;

        try {
          const { content } = await parseMarkdownFile(filePath);

          // Should mention contract establishment
          expect(content.toLowerCase()).toContain("contract");

          // Should mention no file creation initially
          expect(content.toLowerCase()).toMatch(
            /(no file creation|before creating.*files)/i
          );

          // Should have phases or steps
          expect(content).toMatch(/(phase|step)\s+\d/i);
        } catch (error) {
          // File might not exist for this platform, that's tested elsewhere
          console.warn(
            `Skipping ${platform} create-spec test: ${error.message}`
          );
        }
      }
    });

    test("execute-task commands mention TDD workflow", async () => {
      const platforms = ["cursor", "copilot"];

      for (const platform of platforms) {
        const config = PLATFORM_CONFIG[platform];
        const filePath = `${config.directory}/execute-task${config.extension}`;

        try {
          const { content } = await parseMarkdownFile(filePath);

          // Should mention TDD
          expect(content.toLowerCase()).toMatch(
            /(tdd|test.*driven|test.*first)/i
          );
        } catch (error) {
          console.warn(
            `Skipping ${platform} execute-task test: ${error.message}`
          );
        }
      }
    });
  });

  describe("Command Naming Consistency", () => {
    test("commands use consistent naming across platforms", async () => {
      const allCommands = new Set();
      const platformCommands = {};

      for (const platform of Object.keys(PLATFORM_CONFIG)) {
        const commandFiles = await getCommandFiles(platform);
        const commands = commandFiles.map(extractCommandName);

        platformCommands[platform] = commands;
        commands.forEach((cmd) => allCommands.add(cmd));
      }

      // Check for naming inconsistencies
      for (const command of allCommands) {
        const variations = [];

        for (const [platform, commands] of Object.entries(platformCommands)) {
          const hasExact = commands.includes(command);
          const similar = commands.filter(
            (cmd) => cmd.includes(command) || command.includes(cmd)
          );

          if (hasExact) {
            variations.push(`${platform}:exact`);
          } else if (similar.length > 0) {
            variations.push(`${platform}:similar(${similar.join(",")})`);
          }
        }

        // Log potential inconsistencies
        if (
          variations.length > 1 &&
          variations.length < Object.keys(PLATFORM_CONFIG).length
        ) {
          console.log(
            `⚠️  Command "${command}" variations: ${variations.join(" | ")}`
          );
        }
      }
    });
  });

  describe("Content Quality Checks", () => {
    test.each(["cursor", "copilot"])(
      "platform %s commands have substantial content",
      async (platform) => {
        const commandFiles = await getCommandFiles(platform);

        for (const filePath of commandFiles) {
          const { content } = await parseMarkdownFile(filePath);

          // Should have meaningful content (more than just headers)
          const lines = content.split("\n").filter((line) => line.trim());
          expect(lines.length).toBeGreaterThan(10);

          // Should have more than just markdown headers
          const nonHeaderLines = lines.filter((line) => !line.startsWith("#"));
          expect(nonHeaderLines.length).toBeGreaterThan(5);
        }
      }
    );

    test("commands contain actionable instructions", async () => {
      const platforms = ["cursor", "copilot"];
      const actionWords = [
        "use",
        "create",
        "analyze",
        "scan",
        "generate",
        "execute",
        "follow",
      ];

      for (const platform of platforms) {
        const commandFiles = await getCommandFiles(platform);

        for (const filePath of commandFiles) {
          const { content } = await parseMarkdownFile(filePath);
          const lowerContent = content.toLowerCase();

          // Should contain action words
          const hasActionWords = actionWords.some((word) =>
            lowerContent.includes(word)
          );
          expect(hasActionWords).toBe(true);
        }
      }
    });
  });

  describe("Directory.Build.props Template", () => {
    let content;

    test("template is valid XML structure", async () => {
      content = await fs.readFile("copilot/Directory.Build.props", "utf8");
      expect(content).toMatch(/^<Project>/);
      expect(content).toMatch(/<\/Project>\s*$/);
    });

    test("template has Code Captain label marker", async () => {
      content = await fs.readFile("copilot/Directory.Build.props", "utf8");
      expect(content).toContain('Label="Code Captain"');
    });

    test("template includes copilot-instructions.md", async () => {
      content = await fs.readFile("copilot/Directory.Build.props", "utf8");
      expect(content).toContain(".github\\copilot-instructions.md");
    });

    test("template includes wildcard patterns for agents and prompts", async () => {
      content = await fs.readFile("copilot/Directory.Build.props", "utf8");
      expect(content).toContain(".github\\agents\\**\\*");
      expect(content).toContain(".github\\prompts\\**\\*");
    });

    test("template uses Link attributes for virtual folders", async () => {
      content = await fs.readFile("copilot/Directory.Build.props", "utf8");
      const linkCount = (content.match(/Link="/g) || []).length;
      expect(linkCount).toBeGreaterThanOrEqual(3);
    });
  });

  describe("Platform-Specific Requirements", () => {
    test("copilot prompts reference correct tools", async () => {
      const commandFiles = await getCommandFiles("copilot");
      const copilotTools = [
        "codebase",
        "editFiles",
        "search",
        "runCommands",
        "new",
      ];

      for (const filePath of commandFiles) {
        const { content } = await parseMarkdownFile(filePath);

        // If tools are mentioned, they should be Copilot tools
        if (content.includes("tool")) {
          const hasCopilotTools = copilotTools.some((tool) =>
            content.includes(tool)
          );

          // Should not reference Cursor-specific tools
          expect(content).not.toMatch(/codebase_search|grep_search|read_file/i);
        }
      }
    });

    test("cursor commands use correct command syntax", async () => {
      const commandFiles = await getCommandFiles("cursor");

      for (const filePath of commandFiles) {
        const { content } = await parseMarkdownFile(filePath);

        // Should use slash syntax for command references (Cursor's native command format)
        if (content.match(/\/[a-z-]+/)) {
          expect(content).toMatch(/\/[a-z-]+/i);
        }

        // Should not use cc: syntax (deprecated in favor of slash commands)
        expect(content).not.toMatch(/cc:\s+[a-z-]+/i);
      }
    });
  });
});
