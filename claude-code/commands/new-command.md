# New Command Creator (/new-command)

## Overview

A meta command that creates new Code Captain commands and skills for Claude Code, following established patterns and conventions. This command generates properly structured command files or skill directories, and ensures consistency across the Code Captain ecosystem.

**Commands vs Skills:**
- **Commands** (`.claude/commands/[name].md`): Interactive, multi-step workflows invoked as `/name`. Best for contract-style workflows, planning, editing, and execution flows.
- **Skills** (`.claude/skills/[name]/SKILL.md`): Bounded, composable capabilities with SKILL.md frontmatter. Best for analysis, reporting, single-purpose reusable tasks.

## Command Process

### Phase 1: Command Contract Establishment (No File Creation)

**Mission Statement:**

> Your goal is to turn my rough command idea into a comprehensive command specification. You will deliver the complete command package only after we both agree on the command contract. **Important: Challenge command ideas that don't fit the Code Captain ecosystem or would create maintenance burden - it's better to surface concerns early than build the wrong command.**

#### Step 1.1: Initial Context Scan

- Use `Glob` to scan existing commands in `.claude/commands/` to understand patterns
- Use `Glob` to scan existing skills in `.claude/skills/` to understand skill patterns
- Use `Grep` to analyze existing Code Captain ecosystem
- Load command patterns from successful commands (`create-spec`, `execute-task`, etc.)
- **Output:** Context summary (no files created yet)

#### Step 1.2: Gap Analysis & Silent Enumeration

**Internal Process (not shown to user):**

- Silently list every missing detail about the command's purpose and implementation
- Identify ambiguities in the initial command description
- Note potential conflicts with existing commands or skills
- Catalog unknowns across these domains:
  - Command purpose & unique value proposition
  - Target workflow & user scenarios
  - Execution complexity & style requirements
  - Input/output specifications
  - Tool integration requirements
  - File organization & output locations
  - Error handling & edge cases
  - Integration with existing commands and skills
  - Documentation & help text needs
  - Whether this should be a command or a skill

#### Step 1.3: Structured Clarification Loop

**Rules:**

- Ask ONE focused question at a time
- After each answer, re-scan existing commands and skills for additional context if relevant
- Continue until reaching 95% confidence on command specification
- Each question should target the highest-impact unknown
- **Never declare "final question"** - let the conversation flow naturally
- Let the user signal when they're ready to lock the contract
- **Challenge command ideas that create complexity or don't fit** - better to surface concerns early than build problematic commands

**Critical Analysis Responsibility:**

- If command seems to duplicate existing functionality, explain the overlap and suggest alternatives
- If complexity seems too high for the proposed value, recommend simplification
- If the command doesn't fit Code Captain patterns, point out the inconsistency
- If implementation would create maintenance burden, suggest alternative approaches
- If command scope is unclear or too broad, ask for focus and boundaries
- If the task is bounded and reusable, suggest a skill instead of a command

**Pushback Phrasing Examples:**

- "I see potential overlap with [existing command]. How would [your command] be different from [existing]?"
- "The complexity you're describing sounds like it might need 3-4 separate commands. Should we focus on [core piece] first?"
- "I'm concerned that [proposed approach] would break Code Captain's [established pattern]. Have you considered [alternative]?"
- "This command would need significant ongoing maintenance. Could we achieve the same goal with [simpler approach]?"
- "This sounds more like a skill than a command - it's bounded and composable. Would a skill work better here?"

**Question Categories (examples):**

- "What specific developer workflow does this solve that existing commands don't cover?"
- "Should this integrate with [existing command/skill found in scan], or remain separate?"
- "What does 'success' look like - how will developers know the command worked correctly?"
- "Should this be a contract-style command (extensive clarification like create-spec) or direct execution (immediate action like swab)?"
- "Should this be a command (interactive workflow) or a skill (bounded, composable capability)?"
- "Where should outputs be stored - new folder or existing (.code-captain/[folder])?"
- "What Claude Code tools will it need - Grep, Glob, Read, Write, Edit, Bash, WebSearch, TodoWrite?"

**Transition to Contract:**

- When confidence is high, present contract without declaring it "final"
- Use phrases like "I think I understand the command you need" or "Based on our discussion, here's the command specification"
- Always leave room for more questions if needed

#### Step 1.4: Echo Check (Command Contract Proposal)

When confident, present a command contract proposal with any concerns surfaced:

**Format:**

```
## Command Contract

**Command Name:** [validated-command-name]

**Type:** [Command (.claude/commands/) or Skill (.claude/skills/)]

**Purpose:** [One clear sentence describing what this command does]

**Unique Value:** [How this differs from existing commands/skills and why it's needed]

**Execution Style:** [Contract-style with clarification OR Direct execution]

**Workflow Pattern:** [Step-by-step process the command follows]

**Inputs Required:** [Arguments, flags, or interactive inputs needed]

**Outputs Created:** [Files, directories, or modifications made]

**Tool Integration:** [Claude Code tools required: Grep, Glob, Read, Write, Edit, Bash, WebSearch, TodoWrite, etc.]

**⚠️ Implementation Concerns (if any):**
- [Specific concern about complexity, maintenance, or ecosystem fit]
- [Suggested alternative or mitigation approach]

**💡 Recommendations:**
- [Suggestions for improving the command based on ecosystem analysis]
- [Ways to reduce complexity or improve consistency]

---
Options:
- Type 'yes' to lock this contract and create the command
- Type 'edit: [your changes]' to modify the contract
- Type 'examples' to see similar commands for reference
- Type 'blueprint' to see the planned file structure and documentation
- Ask more questions if anything needs clarification
```

### Phase 2: Command Package Creation (Post-Agreement Only)

**Triggered only after user confirms contract with 'yes'**

#### Step 2.1: Initialize Tracking

Use `TodoWrite` to track creation process:
```
1. Generate command documentation with proper structure
2. Validate command integration and consistency
3. Present completed command for user review
```

#### Step 2.2: Generate Command File Structure

**For Commands** (`.claude/commands/[name].md`):

```markdown
# [Command Name] Command ([command-name])

## Overview

[Generated from description and clarifying questions]

## Command Process

### Step 1: [Phase Name]

[Generated workflow steps based on contract]

### Step 2: [Phase Name]

[Generated workflow steps based on contract]

## Core Rules

[Generated based on command type and execution style from contract]

## Tool Integration

[Generated tool usage based on contract requirements]

## Integration Notes

[Generated integration details with existing commands]
```

**For Skills** (`.claude/skills/[name]/SKILL.md`):

```markdown
---
name: [skill-name]
mode: agent
description: [One-line description for triggering]
argument-hint: "[optional-arg]"
---

# [Skill Name]

## Overview

[Generated from description and clarifying questions]

## Process

[Generated workflow steps based on contract]

## Output

[Generated output format and file locations]
```

**Template Sections Based on Command Type and Execution Style:**

**Contract Style Commands** (like `create-spec`, `create-adr`):

- Phase 1: Contract Establishment (No File Creation)
- Interactive clarification rounds with structured questions
- Critical analysis and assumption challenging
- Echo check/contract proposal phase
- Explicit user agreement before proceeding

**Direct Execution Commands** (like `swab`, `execute-task`):

- Immediate action workflows
- Minimal clarification if needed
- Clear step-by-step execution
- Progress feedback and completion confirmation

**Setup/Analysis Commands:**

- Context scanning steps
- File generation workflows
- Progress tracking with `TodoWrite`

**Implementation Commands:**

- TDD workflows if applicable
- Code modification steps
- Verification procedures

**Skills (bounded, composable):**

- Single clear purpose with frontmatter
- Argument-hint for invocation clarity
- Agent mode for delegation
- Focused output format

#### Step 2.3: Validation and Integration

**Verify Command Integration:**

- Check command file syntax and structure using `Read`
- Use `Grep` to ensure no conflicts with existing commands
- Validate command follows established patterns
- Test command can be discovered by Claude Code

**Present Summary:**

```
✅ New [command/skill] created successfully!

📁 Files Created:
  - .claude/commands/[command-name].md   (for commands)
  - .claude/skills/[name]/SKILL.md       (for skills)

🚀 Ready:
  Usage: /[command-name] [args]
  Documentation: .claude/commands/[command-name].md
```

## Core Rules

1. **Consistent Structure** - All generated commands follow established patterns
2. **Clear Documentation** - Each section has purpose and implementation details
3. **Validation Required** - Check for conflicts and proper structure
4. **Template Flexibility** - Adapt template based on command type and requirements
5. **Language & Shell Agnostic** - Commands should work across different programming languages and shell environments
6. **Command vs Skill** - Choose the right type based on the workflow's nature

## Implementation Details

### Command Name Validation

**Validation Rules:**

- Lowercase letters, numbers, hyphens only
- No spaces or special characters
- Maximum 20 characters
- Cannot start with number or hyphen
- Must not conflict with existing commands or skills

**Validation Process:**

Use `Bash` to check:
```bash
# Check format
echo "command-name" | grep -E '^[a-z][a-z0-9-]*[a-z0-9]$'

# Check conflicts with commands
ls .claude/commands/ | grep "^command-name.md$"

# Check conflicts with skills
ls .claude/skills/ | grep "^command-name$"
```

### Template Selection Logic

**Command Categories and Templates:**

1. **Setup/Analysis** (`initialize`, `explain-code` skill, `research` skill)
   - Context scanning workflows
   - Documentation generation
   - Progress tracking emphasis

2. **Planning/Specification** (`create-spec`, `create-adr`, `plan-product`)
   - Interactive clarification phases
   - Structured output formats
   - Contract-based workflows

3. **Implementation** (`execute-task`, `swab` skill)
   - Code modification workflows
   - TDD patterns
   - Verification steps

4. **Quality/Meta** (`status` skill, `new-command`)
   - Reporting and analysis
   - Command scaffolding

### Tool Reference Guide

Use these Claude Code tools (not Cursor tools):
- `Grep` - Search for patterns in codebase
- `Glob` - Find files by pattern
- `Bash` - Run shell commands, list directories
- `Read` - Read file contents
- `Write` - Create new files
- `Edit` - Modify existing files
- `WebSearch` - Search the web
- `TodoWrite` - Track progress with todos
- `WebFetch` - Fetch web content

### Error Handling

**Common Issues:**

- **Duplicate command name**: Check existing commands and skills, suggest alternatives
- **Invalid command name format**: Provide format guidance and examples
- **Wrong type chosen**: Explain command vs skill distinction, recommend the right type

**Error Messages:**

```
❌ Command creation failed: [specific reason]

Suggestions:
- Check command name format (lowercase, hyphens only)
- Ensure name doesn't conflict with existing commands or skills
- Verify all required inputs are provided

Try: /new-command "valid-name" "clear description"
```

## Integration Notes

This command integrates with Code Captain by:

1. **Following Established Patterns** - Uses same structure as existing commands and skills
2. **Maintaining Consistency** - Ensures all new artifacts match style and format
3. **Supporting Both Types** - Creates commands or skills based on the use case
4. **Quality Assurance** - Validates structure and prevents conflicts
5. **Claude Code Native** - Uses Claude Code tools, not Cursor/IDE-specific APIs
