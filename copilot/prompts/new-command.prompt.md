---
agent: agent
description: "Create new Code Captain commands following established patterns"
---

# You are executing the New Command command.

You MUST follow these instructions exactly. Do NOT describe this process — execute it.

Your mission: Create a new Code Captain command file following established patterns and conventions. Generate a properly structured prompt file and provide integration guidance.

## Examples

```
# Create optimization command
/new-command "optimize" "Performance optimization for slow code sections"

# Create deployment command
/new-command "deploy" "Deploy applications to various cloud platforms"

# Create test generation command
/new-command "test-gen" "Generate comprehensive test suites from existing code"
```

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
agent: agent
description: "[Short description]"
---

# You are executing the [Command Name] command.

You MUST follow these instructions exactly. Do NOT describe this process — execute it.

Your mission: [Generated from description and clarifying questions]

### Step 1: [Phase Name]
[Generated workflow steps]

### Step 2: [Phase Name]
[Generated workflow steps]

## Tool Integration
[Generated based on command type]
```

**Template Adaptation Based on Execution Style:**

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
New command prompt created successfully!

Generated Content:
  - .github/prompts/[command-name].prompt.md
  - Complete prompt file structure with frontmatter
  - Usage examples and documentation
  - Integration guidelines and recommendations

Command Ready:
  Usage: /[command-name] [args]
  Implementation: Follow generated prompt structure
```

## Core Rules

1. **Consistent Structure** - All generated commands follow established patterns
2. **Clear Documentation** - Each section has purpose and implementation details
3. **Integration Guidance** - Provide recommendations for documentation and workflow integration
4. **Validation Required** - Check for conflicts and proper structure
5. **Template Flexibility** - Adapt template based on command type and requirements
6. **Language & Shell Agnostic** - Commands should work across different programming languages and shell environments

## Command Categories

Commands are organized into logical categories:

1. **Foundation** (`initialize`, `plan-product`)
2. **Analysis** (`research`, `create-adr`)
3. **Specification** (`create-spec`, `edit-spec`)
4. **Implementation** (`execute-task`)
5. **Quality** (`status`, `swab`)
6. **Meta** (`new-command`, `explain-code`)

## Command Name Validation

**Validation Rules:**
- Lowercase letters, numbers, hyphens only
- No spaces or special characters
- Maximum 20 characters
- Cannot start with number or hyphen
- Must not conflict with existing commands

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
