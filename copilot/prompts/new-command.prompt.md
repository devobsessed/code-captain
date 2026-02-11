---
agent: Code Captain
---

# New Command Creator

## Overview

A meta command that creates new Code Captain commands following established patterns and conventions. This command generates properly structured command files, updates documentation, and ensures consistency across the Code Captain ecosystem.

## Examples

```
# Create optimization command
/new-command "optimize" "Performance optimization for slow code sections"

# Create deployment command  
/new-command "deploy" "Deploy applications to various cloud platforms"

# Create test generation command
/new-command "test-gen" "Generate comprehensive test suites from existing code"
```

## Command Process

### Step 1: Command Specification Gathering

**Initial Input Processing:**
- Parse command name (validate format: lowercase, hyphens allowed)
- Extract brief description from user input
- Validate command name doesn't conflict with existing commands

**Interactive Specification Building:**
Ask clarifying questions to build complete command specification:

1. **Command Category**: "Is this a [Foundation/Analysis/Specification/Implementation/Quality/Meta] command?"
2. **Execution Style**: "Should this use contract style (extensive clarification rounds like create-spec) or direct execution (immediate action like swab)?"
3. **Usage Pattern**: "Does it take arguments, flags, or is it standalone?"
4. **AI Coordination**: "Does it need AI prompts for complex decision-making?"
5. **Output Location**: "Where should outputs be stored? (.code-captain/[folder])"
6. **Tool Integration**: "Which GitHub Copilot tools will it use? (codebase, search, etc.)"
7. **Workflow Steps**: "What are the main phases/steps the command follows?"

### Step 2: Command Structure Generation

**Generate Standard Prompt File Structure:**

```markdown
---
agent: Code Captain
---

# [Command Name] Command

## Overview
[Generated from description and clarifying questions]

## Command Process

### Step 1: [Phase Name]
[Generated workflow steps]

### Step 2: [Phase Name]
[Generated workflow steps]

## Tool Integration
[Generated based on command type]

## AI Implementation Prompt
[Generated if AI coordination needed]

## Integration Notes
[Generated integration details]
```

**Template Sections Based on Command Type and Execution Style:**

**Contract Style Commands** (like `/create-spec`, `/create-adr`):
- Phase 1: Contract Establishment (No File Creation)
- Interactive clarification rounds with structured questions
- Critical analysis and assumption challenging
- Echo check/contract proposal phase
- Explicit user agreement before proceeding

**Direct Execution Commands** (like `/swab`, `/execute-task`):
- Immediate action workflows
- Minimal clarification if needed
- Clear step-by-step execution
- Progress feedback and completion confirmation

**Foundation Commands:**
- Project initialization steps
- Planning and product setup workflows
- Configuration and environment setup

**Analysis Commands:**
- Context scanning steps
- Research and analysis workflows
- Documentation review and assessment

**Specification Commands:**
- Specification creation and editing
- Structured documentation workflows
- Contract-based clarification processes

**Implementation Commands:**
- TDD workflows if applicable
- Code modification steps
- Task execution procedures

**Quality Commands:**
- Health and status reporting
- QA-oriented checks and validations
- Lightweight remediation workflows

**Meta Commands:**
- Command scaffolding and documentation updates
- Code understanding and explanation
- Process and tooling refinements

### Step 3: Documentation Integration

**Provide guidance for documentation updates:**

1. **Command Documentation:**
   - Generate complete prompt file structure
   - Include usage examples and integration notes
   - Provide clear implementation guidelines

2. **Integration Recommendations:**
   - Suggest where command fits in existing workflow
   - Identify related commands and dependencies
   - Recommend documentation updates if needed

### Step 4: Validation and Integration

**Verify Command Integration:**
- Check command file syntax and structure
- Validate documentation updates
- Ensure no conflicts with existing commands
- Run basic structure validation

**Present Summary:**
```
✅ New command prompt created successfully!

📁 Generated Content:
  - .github/prompts/[command-name].prompt.md
  - Complete prompt file structure with frontmatter
  - Usage examples and documentation
  - Integration guidelines and recommendations

🚀 Command Ready:
  Usage: /[command-name] [args]
  Implementation: Follow generated prompt structure
```

## Core Rules

1. **Consistent Structure** - All generated commands follow established patterns
2. **Clear Documentation** - Each section has purpose and implementation details
3. **Integration Guidance** - Provides recommendations for documentation and workflow integration
4. **Validation Required** - Check for conflicts and proper structure
5. **Template Flexibility** - Adapt template based on command type and requirements
6. **Language & Shell Agnostic** - Commands should work across different programming languages and shell environments, using Code Captain's existing tools rather than making assumptions about tech stack

## AI Implementation Prompt

```
You are creating a new Code Captain command following established patterns.

MISSION: Generate a complete, well-structured command file and update documentation.

COMMAND SPECIFICATION:
- Name: {command_name}
- Description: {description}
- Category: {category}
- Execution Style: {contract_style_or_direct_execution}
- Usage Pattern: {usage_pattern}
- AI Coordination: {needs_ai_prompts}
- Output Location: {output_location}
- Tool Integration: {copilot_tools}
- Workflow Steps: {workflow_phases}

TEMPLATE STRUCTURE:
1. Frontmatter: agent: Code Captain
2. Title: # [Command Name] Command
3. Overview: Purpose and capabilities
4. Command Process: Detailed step-by-step workflow
5. Tool Integration: GitHub Copilot tool coordination
6. AI Implementation Prompt: (if AI coordination needed)
7. Integration Notes: Platform coordination

TEMPLATE ADAPTATION RULES:
- Contract Style commands: Include clarification phases, contract establishment, critical analysis, user agreement checkpoints
- Direct Execution commands: Include immediate action workflows, minimal interaction, clear progress feedback
- Foundation commands: Include project initialization, planning workflows, configuration setup
- Analysis commands: Include context scanning, research workflows, documentation assessment
- Specification commands: Include specification creation, structured documentation, contract-based processes
- Implementation commands: Include TDD workflows, code modification, task execution
- Quality commands: Include health and status reporting, QA-oriented checks and validations, lightweight remediation workflows
- Meta commands: Include command scaffolding and documentation updates, code understanding and explanation, process and tooling refinements
- All commands: Include clear examples, tool coordination, progress tracking
- CRITICAL: Be language and shell agnostic - use codebase, search instead of language-specific commands or hardcoded file extensions

DOCUMENTATION GUIDANCE:
Provide recommendations for integrating the new command:
- Suggest workflow placement and related commands
- Include usage examples and best practices
- Recommend documentation structure and content

OUTPUT REQUIREMENTS:
1. Generate complete .prompt.md file with frontmatter following the template
2. Provide integration recommendations and workflow guidance
3. Include clear usage examples and implementation notes
4. Ensure consistency with existing command patterns
5. Validate no conflicts with existing commands

QUALITY CHECKS:
- Command name follows naming conventions (lowercase, hyphens)
- Usage examples are clear and practical
- Workflow steps are actionable and specific
- Integration points are clearly documented
- All sections serve a clear purpose
- No hardcoded language assumptions or shell-specific commands
- Uses Code Captain's existing tools (codebase, search) rather than system-specific commands
```

## Implementation Details

### Command Name Validation

**Validation Rules:**
- Lowercase letters, numbers, hyphens only
- No spaces or special characters
- Maximum 20 characters
- Cannot start with number or hyphen
- Must not conflict with existing commands

**Validation Process:**
```bash
# Check format
echo "command-name" | grep -E '^[a-z][a-z0-9-]*[a-z0-9]$'

# Check conflicts
ls .github/prompts/ | grep "^command-name.prompt.md$"
```

### Command Categories

Commands are organized into logical categories:

1. **Foundation** (`initialize`, `plan-product`)
2. **Analysis** (`research`, `create-adr`)  
3. **Specification** (`create-spec`, `edit-spec`)
4. **Implementation** (`execute-task`)
5. **Quality** (`status`, `swab`)
6. **Meta** (`new-command`, `explain-code`)

### Template Selection Logic

**Command Categories and Templates:**

1. **Foundation** (`initialize`, `plan-product`)
   - Project initialization workflows
   - Planning and setup processes
   - Configuration and environment preparation

2. **Analysis** (`research`, `create-adr`)
   - Context scanning workflows
   - Documentation generation
   - Research and assessment emphasis

3. **Specification** (`create-spec`, `edit-spec`)
   - Interactive clarification phases
   - Structured output formats
   - Contract-based workflows

4. **Implementation** (`execute-task`)
   - Code modification workflows
   - TDD patterns
   - Task execution steps

5. **Quality** (`status`, `swab`)
   - Health and status reporting
   - QA-oriented checks and validations
   - Lightweight remediation workflows

6. **Meta** (`new-command`, `explain-code`)
   - Command scaffolding and documentation updates
   - Code understanding and explanation
   - Process and tooling refinements



### Error Handling

**Common Issues:**
- **Duplicate command name**: Check existing prompts, suggest alternatives
- **Invalid command name format**: Provide format guidance and examples
- **Documentation integration conflicts**: Use safe merge strategies, manual review if needed
- **Template generation errors**: Validate inputs, provide clear error messages

**Error Messages:**
```
❌ Command creation failed: [specific reason]

Suggestions:
- Check command name format (lowercase, hyphens only)
- Ensure name doesn't conflict with existing commands
- Verify all required inputs are provided

Try: /new-command "valid-name" "clear description"
```

## Tool Integration

**Primary tools:**
- `codebase` - Analyzing existing prompt patterns and structure
- `search` - Finding existing prompts to check for conflicts
- `editFiles` - Creating new prompt files and updating documentation
- `runCommands` - Command name validation and directory operations

**Documentation organization:**
- Prompt files stored in `.github/prompts/`
- Integration guidance for documentation updates
- Validation and conflict checking before creation

## Integration Notes

This command integrates with Code Captain by:

1. **Following Established Patterns** - Uses same structure as existing prompts
2. **Maintaining Consistency** - Ensures all new prompts match style and format
3. **Documentation Guidance** - Provides clear recommendations for integration and usage
4. **Extensibility** - Makes it easy to add new capabilities to Code Captain
5. **Quality Assurance** - Validates structure and prevents conflicts

## Future Enhancements

Potential improvements (not in initial version):

- **Template Library**: Multiple prompt templates for different use cases
- **Interactive Wizard**: Step-by-step prompt creation with guidance
- **Integration Testing**: Automated testing of generated prompts
- **Version Control**: Track prompt changes and updates
- **Command Dependencies**: Handle prompts that depend on other prompts

But for now: Focus on core functionality - create well-structured prompts that integrate seamlessly with the existing Code Captain ecosystem.