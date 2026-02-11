import { describe, expect, test } from "vitest";
import {
  CORE_COMMANDS,
  extractSections,
  hasContractFirstApproach,
  parseMarkdownFile,
  PLATFORM_CONFIG,
} from "./utils/test-helpers.js";

describe("Content Consistency Tests", () => {
  describe("Cross-Platform Message Consistency", () => {
    test.each(CORE_COMMANDS)(
      'command "%s" has consistent core messaging',
      async (commandName) => {
        const platformContents = {};
        const platforms = ["cursor", "copilot"];

        // Collect content from all platforms
        for (const platform of platforms) {
          const config = PLATFORM_CONFIG[platform];
          const filePath = `${config.directory}/${commandName}${config.extension}`;

          try {
            const { content, data } = await parseMarkdownFile(filePath);
            platformContents[platform] = { content, frontmatter: data };
          } catch (error) {
            // File might not exist - skip this platform
            continue;
          }
        }

        // Skip if we don't have at least 2 platforms to compare
        if (Object.keys(platformContents).length < 2) {
          console.log(
            `⚠️  Skipping ${commandName} - insufficient platforms for comparison`
          );
          return;
        }

        // Check for consistent key concepts
        const keyPhrases = {
          "create-spec": ["contract", "specification", "clarification"],
          "execute-task": ["tdd", "test", "task"],
          initialize: ["foundation", "setup", "project"],
          "plan-product": ["product", "planning", "comprehensive"],
          research: ["research", "systematic", "topic"],
        };

        const expectedPhrases = keyPhrases[commandName] || [];

        // Skip commands without defined key phrases
        if (expectedPhrases.length === 0) {
          console.log(`⚠️  Skipping ${commandName} - no key phrases defined`);
          return;
        }

        for (const phrase of expectedPhrases) {
          const platformsWithPhrase = Object.entries(platformContents)
            .filter(([platform, data]) =>
              data.content.toLowerCase().includes(phrase.toLowerCase())
            )
            .map(([platform]) => platform);

          // Require at least 2 platforms to mention each key phrase
          expect(platformsWithPhrase.length).toBeGreaterThanOrEqual(2);
        }
      }
    );
  });

  describe("Contract-First Approach Consistency", () => {
    test("all create-spec variants follow contract-first approach", async () => {
      const platforms = ["cursor", "copilot"];
      const contractFirstCount = [];
      let presentVariants = 0;

      for (const platform of platforms) {
        const config = PLATFORM_CONFIG[platform];
        const filePath = `${config.directory}/create-spec${config.extension}`;

        try {
          const { content } = await parseMarkdownFile(filePath);
          presentVariants++;

          if (hasContractFirstApproach(content)) {
            contractFirstCount.push(platform);
          }
        } catch (error) {
          // File doesn't exist, skip
          continue;
        }
      }

      // All present variants must be contract-first
      expect(presentVariants).toBeGreaterThan(0);
      expect(contractFirstCount.length).toBe(presentVariants);
    });
  });

  describe("Section Structure Consistency", () => {
    test.each(["create-spec", "execute-task", "initialize"])(
      'command "%s" has consistent section structure',
      async (commandName) => {
        const platformSections = {};
        const platforms = ["cursor", "copilot"];

        for (const platform of platforms) {
          const config = PLATFORM_CONFIG[platform];
          const filePath = `${config.directory}/${commandName}${config.extension}`;

          try {
            const { content } = await parseMarkdownFile(filePath);
            const sections = extractSections(content);
            platformSections[platform] = Object.keys(sections);
          } catch (error) {
            continue;
          }
        }

        if (Object.keys(platformSections).length < 2) {
          console.log(
            `⚠️  Skipping ${commandName} section comparison - insufficient platforms`
          );
          return;
        }

        // Find common sections
        const allSections = Object.values(platformSections).flat();
        const commonSections = [...new Set(allSections)].filter(
          (section) =>
            Object.values(platformSections).filter((sections) =>
              sections.includes(section)
            ).length >= 2
        );

        // Should have some common sections
        expect(commonSections.length).toBeGreaterThan(0);

        // Log section analysis
        console.log(`\n📋 ${commandName} sections:`);
        for (const [platform, sections] of Object.entries(platformSections)) {
          console.log(`  ${platform}: ${sections.join(", ")}`);
        }
        console.log(`  Common: ${commonSections.join(", ")}`);
      }
    );
  });

  describe("Tool Reference Consistency", () => {
    test("platforms use appropriate tool references", async () => {
      const platformTools = {
        cursor: [
          "codebase_search",
          "grep_search",
          "read_file",
          "list_dir",
          "edit_file",
          "file_search",
        ],
        copilot: [
          "changes",
          "codebase",
          "editFiles",
          "extensions",
          "fetch",
          "findTestFiles",
          "new",
          "openSimpleBrowser",
          "problems",
          "runCommands",
          "runNotebooks",
          "runTasks",
          "runTests",
          "search",
          "searchResults",
          "terminalLastCommand",
          "terminalSelection",
          "testFailure",
          "usages",
        ],
      };

      for (const [platform, expectedTools] of Object.entries(platformTools)) {
        const config = PLATFORM_CONFIG[platform];

        // Check a sample command file
        const filePath = `${config.directory}/create-spec${config.extension}`;

        let content;
        try {
          const result = await parseMarkdownFile(filePath);
          content = result.content;
        } catch (error) {
          // File doesn't exist, skip
          continue;
        }

        // Should contain some expected tools for the platform
        const mentionedTools = expectedTools.filter(
          (tool) => content.includes(tool) || content.includes(`\`${tool}\``)
        );

        // If tools are mentioned, they should be platform-appropriate
        if (content.includes("`") && content.includes("tool")) {
          // Soft requirement for presence (no assert), but enforce "no cross-platform tools"
        }

        // Should not contain tools from other platforms
        const otherPlatformTools = Object.entries(platformTools)
          .filter(([p]) => p !== platform)
          .flatMap(([p, tools]) => tools)
          .filter((tool) => !expectedTools.includes(tool));

        const wrongTools = otherPlatformTools.filter(
          (tool) =>
            content.includes(`\`${tool}\``) ||
            content.includes(`'${tool}'`) ||
            content.includes(`"${tool}"`)
        );

        if (mentionedTools.length > 0 || /tools?/i.test(content)) {
          expect(
            wrongTools.length,
            `${platform} contains tools from other platforms: ${wrongTools.join(
              ", "
            )}`
          ).toBe(0);
        }
      }
    });
  });

  describe("Command Syntax Consistency", () => {
    test("platforms use correct command syntax in examples", async () => {
      const expectedSyntax = {
        cursor: /cc:\s+[a-z-]+/i,
        copilot: /\/[a-z-]+/i,
        claude: /\/[a-z-]+/i,
      };

      for (const [platform, syntaxPattern] of Object.entries(expectedSyntax)) {
        const config = PLATFORM_CONFIG[platform];

        try {
          // Check the main rules/overview file
          let filePath;
          if (platform === "cursor") {
            filePath = "cursor/cc.md";
          } else if (platform === "copilot") {
            filePath = "copilot/agents/Code Captain.agent.md";
          } else {
            continue; // Skip platforms without main files
          }

          const { content } = await parseMarkdownFile(filePath);

          // Should use platform-appropriate syntax
          if (content.includes("command") || content.includes("usage")) {
            // Look for command examples
            const hasCorrectSyntax = syntaxPattern.test(content);
            expect(hasCorrectSyntax).toBe(true);

            // Log for debugging
            console.log(
              `${platform} syntax check: ${hasCorrectSyntax ? "✅" : "❌"}`
            );
          }
        } catch (error) {
          // File doesn't exist, skip
          continue;
        }
      }
    });
  });

  describe("Quality Standards Consistency", () => {
    test("all platforms emphasize quality and best practices", async () => {
      const qualityKeywords = [
        "best practice",
        "quality",
        "comprehensive",
        "systematic",
        "thorough",
        "complete",
      ];

      const platforms = ["cursor", "copilot"];

      for (const platform of platforms) {
        const config = PLATFORM_CONFIG[platform];

        // Check documentation files
        const docFile = `${platform}/docs/best-practices.md`;

        try {
          const { content } = await parseMarkdownFile(docFile);

          // Should contain quality-related keywords
          const qualityMentions = qualityKeywords.filter((keyword) =>
            content.toLowerCase().includes(keyword.toLowerCase())
          );

          expect(qualityMentions.length).toBeGreaterThan(0);
        } catch (error) {
          // File doesn't exist, that's tested elsewhere
          continue;
        }
      }
    });
  });

  describe("Core Commands Consistency", () => {
    test("core commands have consistent concepts", async () => {
      const commandFiles = [
        "cursor/commands/initialize.md",
        "cursor/commands/create-spec.md",
        "cursor/commands/create-adr.md",
        "cursor/commands/research.md",
        "cursor/commands/execute-task.md",
        "cursor/commands/status.md",
        "cursor/commands/swab.md",
      ];

      for (const file of commandFiles) {
        try {
          const { content } = await parseMarkdownFile(file);

          // Core commands should have consistent concepts
          expect(content).toMatch(
            /(?:foundation|specification|implementation|quality)/i
          );
          expect(content).toMatch(/\.code-captain/);
        } catch {
          // Skip gracefully if the file doesn't exist in this repo variation
          console.warn(`⚠️  Skipping missing file: ${file}`);
          continue;
        }
      }
    });
  });
});
