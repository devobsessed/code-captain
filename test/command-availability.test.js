import { describe, expect, test } from "vitest";
import {
  CORE_COMMANDS,
  extractCommandName,
  fileExists,
  getCommandFiles,
  PLATFORM_CONFIG,
} from "./utils/test-helpers.js";

describe("Command Availability Smoke Tests", () => {
  describe("Platform File Structure", () => {
    test.each(Object.keys(PLATFORM_CONFIG))(
      "platform %s has command directory",
      async (platform) => {
        const config = PLATFORM_CONFIG[platform];
        const directoryExists = await fileExists(config.directory);
        expect(directoryExists).toBe(true);
      }
    );
  });

  describe("Core Command Availability", () => {
    test.each(CORE_COMMANDS)(
      'command "%s" exists on all platforms',
      async (commandName) => {
        const results = {};

        for (const platform of Object.keys(PLATFORM_CONFIG)) {
          const config = PLATFORM_CONFIG[platform];
          let filePath;

          if (platform === "claude" && commandName !== "initialize") {
            // Claude has partial implementation - only check initialize for now
            results[platform] = "partial";
            continue;
          }

          if (platform === "copilot") {
            filePath = `${config.directory}/${commandName}${config.extension}`;
          } else if (platform === "claude") {
            filePath = `${config.directory}/cc-${commandName}${config.extension}`;
          } else {
            filePath = `${config.directory}/${commandName}${config.extension}`;
          }

          results[platform] = await fileExists(filePath);
        }

        // All platforms except Claude should have the command
        expect(results.cursor).toBe(true);
        expect(results.copilot).toBe(true);

        // Claude is allowed to be partial for now
        if (commandName === "initialize") {
          expect(results.claude).toBe(true);
        }
      }
    );
  });

  describe("Platform-Specific Files", () => {
    test("cursor has rules file", async () => {
      expect(await fileExists("cursor/cc.mdc")).toBe(true);
    });

    test("copilot has agent file", async () => {
      expect(
        await fileExists("copilot/agents/Code Captain.agent.md")
      ).toBe(true);
    });

    test("copilot has instructions file", async () => {
      expect(
        await fileExists("copilot/copilot-instructions.md")
      ).toBe(true);
    });

    test("copilot has Directory.Build.props template", async () => {
      expect(
        await fileExists("copilot/Directory.Build.props")
      ).toBe(true);
    });

    test("copilot has code-captain.csproj template", async () => {
      expect(
        await fileExists("copilot/code-captain.csproj")
      ).toBe(true);
    });
  });

  describe("Command Discovery", () => {
    test.each(Object.keys(PLATFORM_CONFIG))(
      "platform %s has discoverable commands",
      async (platform) => {
        const commandFiles = await getCommandFiles(platform);
        expect(commandFiles.length).toBeGreaterThan(0);

        // Extract command names
        const commands = commandFiles.map(extractCommandName);

        // Should have some core commands (allowing for platform differences)
        const hasCreateSpec = commands.includes("create-spec");
        const hasInitialize = commands.includes("initialize");

        expect(hasCreateSpec || hasInitialize).toBe(true);
      }
    );
  });

  describe("Documentation Files", () => {
    test.each(["cursor", "copilot"])(
      "platform %s has best practices documentation",
      async (platform) => {
        expect(await fileExists(`${platform}/docs/best-practices.md`)).toBe(
          true
        );
      }
    );
  });

  describe("Command Coverage Analysis", () => {
    test("report command coverage across platforms", async () => {
      const coverage = {};

      for (const platform of Object.keys(PLATFORM_CONFIG)) {
        const commandFiles = await getCommandFiles(platform);
        const commands = commandFiles.map(extractCommandName);
        coverage[platform] = {
          total: commands.length,
          commands: commands.sort(),
          coreCommands: CORE_COMMANDS.filter((cmd) => commands.includes(cmd)),
        };
      }

      // Log coverage report for debugging
      console.log("\n📊 Command Coverage Report:");
      for (const [platform, data] of Object.entries(coverage)) {
        console.log(`\n${platform.toUpperCase()}:`);
        console.log(`  Total commands: ${data.total}`);
        console.log(
          `  Core commands: ${data.coreCommands.length}/${CORE_COMMANDS.length}`
        );
        console.log(`  Commands: ${data.commands.join(", ")}`);
      }

      // Cursor should have the most complete set
      expect(coverage.cursor.coreCommands.length).toBeGreaterThanOrEqual(8);
      expect(coverage.copilot.coreCommands.length).toBeGreaterThanOrEqual(8);
    });
  });
});
