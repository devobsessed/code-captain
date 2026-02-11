# Code Captain Test Suite

This test suite validates the Code Captain prompt system across all supported platforms (Cursor, GitHub Copilot, Claude).

## Test Categories

- **Structure Validation**: Ensures proper file organization and required components exist
- **Content Consistency**: Validates consistent terminology, concepts, and formatting across commands
- **Command Availability**: Checks that all expected commands are present and accessible
- **Core Commands**: Validates proper command structure, metadata, and content requirements

### 🚀 Smoke Tests (`command-availability.test.js`)

- **Command Availability**: Ensures all core commands exist on each platform
- **File Structure**: Validates platform-specific directory structures
- **Core Commands**: Validates proper command structure, metadata, and content requirements
- **Coverage Analysis**: Reports command availability across platforms

### 🏗️ Structure Tests (`structure-validation.test.js`)

- **Frontmatter Validation**: Platform-specific metadata requirements
- **Content Structure**: Headers, sections, and organization
- **Naming Consistency**: Command naming across platforms
- **Quality Checks**: Content depth and actionable instructions

### 🔄 Consistency Tests (`content-consistency.test.js`)

- **Cross-Platform Messaging**: Similar concepts across platforms
- **Contract-First Approach**: Ensures specification-first methodology
- **Section Structure**: Consistent organization patterns
- **Tool References**: Platform-appropriate tool usage
- **Command Syntax**: Correct invocation patterns per platform

### 🔗 Integration Tests (`integration.test.js`)

- **Workflow Validation**: End-to-end command sequences
- **Cross-References**: Command links and dependencies
- **Manifest Validation**: File tracking in manifest.json
- **Documentation Integration**: README and platform docs
- **Version Consistency**: Package and manifest versions

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests once (CI mode)
npm run test:run

# Run specific test files
npx vitest command-availability
npx vitest structure-validation
npx vitest content-consistency
npx vitest integration
```

## Test Configuration

Tests are configured in `vitest.config.js` with:

- Node.js environment
- Glob patterns for test discovery
- Watch exclusions for prompt directories

## Core Commands Tested

All platforms should support these core commands:

- `create-spec` - Feature specification generation
- `edit-spec` - Specification modification
- `execute-task` - TDD workflow execution
- `initialize` - Project setup and analysis
- `plan-product` - Product planning
- `research` - Systematic research
- `status` - Project status reporting
- `create-adr` - Architecture Decision Records
- `explain-code` - Code explanation and documentation
- `new-command` - Command extension
- `swab` - Small improvements

## Platform-Specific Requirements

### Cursor

- Files: `cursor/commands/*.md`
- Rules: `cursor/cc.mdc`
- Syntax: `cc: command-name`
- Tools: `codebase_search`, `grep_search`, `read_file`

### GitHub Copilot

- Files: `copilot/prompts/*.prompt.md`
- Frontmatter: `agent: Code Captain`
- Agent: `copilot/agents/Code Captain.agent.md`
- Syntax: `/command-name`
- Tools: `codebase`, `editFiles`, `search`

### Claude

- Files: `claude-code/commands/*.md`
- Agents: `claude-code/agents/*.md`
- Syntax: `/command-name`
- Status: Partial implementation

## Test Utilities

The `test/utils/test-helpers.js` provides:

- File existence checking
- Markdown parsing with frontmatter
- Command file discovery
- Content structure analysis
- Platform configuration constants

## Continuous Integration

Tests run automatically on:

- Pull requests
- Main branch pushes
- Release builds

## Troubleshooting

### Common Issues

1. **Missing Dependencies**

   ```bash
   npm install
   ```

2. **Outdated Manifest**

   ```bash
   npm run manifest
   ```

3. **Platform File Not Found**
   - Check if command exists for that platform
   - Verify file naming conventions
   - Review platform-specific directory structure

### Debug Output

Tests include debug output for:

- Command coverage reports
- Section structure analysis
- Cross-platform consistency warnings
- Missing file notifications

### Adding New Tests

1. Add test to appropriate category file
2. Use existing test helpers for consistency
3. Follow platform-agnostic patterns where possible
4. Include debug output for complex validations

## Expected Test Results

### Passing Conditions

- All core commands exist on primary platforms (Cursor, Copilot)
- Frontmatter validation passes for each platform
- Content includes required concepts (contract-first, TDD, etc.)
- No cross-platform tool contamination
- Consistent command syntax usage

### Known Partial Implementations

- Claude platform has limited command set
- Some platforms may lack specific integration commands

Run `npm test` to see current status and detailed coverage reports.
