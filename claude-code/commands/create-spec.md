# Enhanced Create Spec Command (create-spec)

## Command: `create-spec`

## Overview

Generate comprehensive feature specifications using a contract-first approach that ensures complete alignment between developer and AI before creating any supporting files. This command eliminates presumptuous file creation by establishing a clear "contract" through structured clarification rounds.

## Command Process

### Phase 1: Contract Establishment (No File Creation)

**Mission Statement:**

> Your goal is to turn my rough feature idea into a very clear work specification. You will deliver the complete spec package only after we both agree on the requirements contract. **Important: Challenge ideas that don't make technical or business sense - it's better to surface concerns early than build the wrong thing.**

#### Step 1.1: Initial Context Scan

- Scan existing `.code-captain/specs/` for related specifications
- Analyze current codebase architecture and patterns using `Grep`, `Glob`, and `Task` tools
- Load project context files (`tech-stack.md`, `code-style.md`, `objective.md`)
- **Output:** Context summary (no files created yet)

#### Step 1.2: Gap Analysis & Silent Enumeration

**Internal Process (not shown to user):**

- Silently list every missing fact, constraint, or requirement
- Identify ambiguities in the initial description
- Note potential integration points and dependencies
- Catalog unknowns across these domains:
  - Purpose & business value
  - Target audience & user personas
  - Technical constraints & requirements
  - Success criteria & acceptance tests
  - Scope boundaries (in/out of scope)
  - UI/UX requirements & design constraints
  - Performance & scalability needs
  - Security & compliance requirements
  - Integration points with existing systems
  - Risk tolerance & implementation approach

#### Step 1.3: Structured Clarification Loop

**Rules:**

- Ask ONE focused question at a time
- After each answer, re-scan codebase for additional context if relevant
- Continue until reaching 95% confidence on deliverable
- Each question should target the highest-impact unknown
- **Never declare "final question"** - let the conversation flow naturally
- Let the user signal when they're ready to lock the contract
- **Challenge ideas that don't make technical or business sense** - better to surface concerns early than build the wrong thing

**Critical Analysis Responsibility:**

- If requirements seem technically infeasible with current architecture, explain why and suggest alternatives
- If scope seems too large for a single feature, recommend breaking it down
- If user requests conflict with existing patterns found in codebase, point out the inconsistency
- If business logic doesn't align with stated user value, ask clarifying questions
- If performance/security/scalability concerns arise, surface them proactively

**Pushback Phrasing Examples:**

- "I see a potential issue with [requirement] because [technical reason]. Would [alternative approach] work better?"
- "Based on your existing codebase, [proposed approach] might conflict with [existing pattern]. How should we handle this?"
- "The scope you're describing sounds like it might be 3-4 separate features. Should we focus on [core piece] first?"
- "I'm concerned that [requirement] could create [specific problem]. Have you considered [alternative]?"

**Question Categories (examples):**

- "What specific user problem does this solve, and who experiences it?"
- "Should this integrate with [existing system found in codebase], or remain separate?"
- "What does 'success' look like - how will we measure if this works?"
- "Are there performance requirements (response time, throughput, scale)?"
- "What UI/UX constraints exist - web only, mobile responsive, accessibility needs?"
- "What's your risk tolerance - prefer stable/proven approaches or cutting-edge solutions?"

**Transition to Contract:**

- When confidence is high, present contract without declaring it "final"
- Use phrases like "I think I have enough to create a solid contract" or "Based on our discussion, here's what I understand"
- Always leave room for more questions if needed

#### Step 1.4: Echo Check (Contract Proposal)

When confident, present a contract proposal with any concerns surfaced:

**Format:**

```
## Specification Contract

**Deliverable:** [One clear sentence describing what will be built]

**Must Include:** [Critical requirement that makes this valuable]

**Hardest Constraint:** [Biggest technical/business limitation to navigate]

**Success Criteria:** [How we'll know it's working correctly]

**Scope Boundaries:**
- Included: [2-3 key features]
- Excluded: [2-3 things we won't build]

**Technical Concerns (if any):**
- [Specific concern about feasibility, performance, or architecture]
- [Suggested alternative or mitigation approach]

**Recommendations:**
- [Suggestions for improving the approach based on codebase analysis]
- [Ways to reduce risk or complexity]

---
Options:
- Type 'yes' to lock this contract and create the spec package
- Type 'edit: [your changes]' to modify the contract
- Type 'risks' to explore potential implementation risks in detail
- Type 'blueprint' to see the planned folder structure and documents
- Ask more questions if anything needs clarification
```

### Phase 2: Spec Package Creation (Post-Agreement Only)

**Triggered only after user confirms contract with 'yes'**

#### Step 2.1: Initialize Tracking

```bash
# Use TodoWrite to track creation process
1. Get current date and create spec folder structure
2. Generate core specification document
3. Create user stories with acceptance criteria
4. Generate technical sub-specifications
5. Create implementation task breakdown
6. Present package for user review and validation
```

#### Step 2.2: Determine Current Date

Get current date by running: `npx @devobsessed/code-captain date`

This returns the current date in `YYYY-MM-DD` format for folder naming:
`.code-captain/specs/[DATE]-[feature-name]/`

#### Step 2.3: Create Directory Structure

**Generated folder (using determined date):**

```
.code-captain/specs/[DATE]-{feature-name}/
├── spec.md                    # Main specification (from contract)
├── spec-lite.md              # Condensed version for AI context
├── user-stories/             # Individual user story files
│   ├── README.md             # Overview and progress tracking
│   ├── story-1-{name}.md     # Individual user story with focused tasks
│   ├── story-2-{name}.md     # Each story kept small and manageable
│   └── story-N-{name}.md     # Max 5-7 implementation tasks per story
└── sub-specs/                # Technical deep-dives
    ├── technical-spec.md     # Architecture & implementation details
    ├── database-schema.md    # Database changes (if needed)
    ├── api-spec.md          # API documentation (if needed)
    └── ui-wireframes.md     # UI/UX specifications (if needed)
```

#### Step 2.4: Generate Core Documents

**spec.md** - Built directly from the locked contract:

```markdown
# [Feature Name] Specification

> Created: [DATE from Step 2.2 determination process]
> Status: Planning
> Contract Locked: Yes

## Contract Summary

[Echo check content verbatim]

## Detailed Requirements

[Expanded from clarification responses]

## Implementation Approach

[Technical strategy based on codebase analysis]
```

**user-stories/ folder structure** - Individual user story files for better organization:

**user-stories/README.md** - Overview and progress tracking:

```markdown
# User Stories Overview

> **Specification:** [Feature Name] > **Created:** [DATE] > **Status:** Planning

## Stories Summary

| Story | Title         | Status      | Tasks | Progress |
| ----- | ------------- | ----------- | ----- | -------- |
| 1     | [Story title] | Not Started | 5     | 0/5      |
| 2     | [Story title] | Not Started | 4     | 0/4      |
| 3     | [Story title] | Not Started | 6     | 0/6      |

**Total Progress:** 0/15 tasks (0%)

## Story Dependencies

- Story 2 depends on Story 1 completion
- Story 3 can run parallel to Story 2

## Quick Links

- [Story 1: User Login](./story-1-user-login.md)
- [Story 2: Password Reset](./story-2-password-reset.md)
- [Story 3: Profile Management](./story-3-profile-management.md)
```

**user-stories/story-1-{name}.md** - Individual story files (max 5-7 tasks each):

```markdown
# Story 1: [Title from contract deliverable]

> **Status:** Not Started
> **Priority:** High
> **Dependencies:** None

## User Story

**As a** [user type from clarification]
**I want to** [action from contract]
**So that** [value from contract must-include]

## Acceptance Criteria

- [ ] Given [context], when [action], then [outcome]
- [ ] Given [context], when [action], then [outcome]
- [ ] Given [context], when [action], then [outcome]

## Implementation Tasks

- [ ] 1.1 Write tests for [specific component]
- [ ] 1.2 [Focused technical step]
- [ ] 1.3 [Focused technical step]
- [ ] 1.4 [Focused technical step]
- [ ] 1.5 Verify acceptance criteria are met
- [ ] 1.6 Verify all tests pass

## Notes

[Any specific technical considerations, risks, or dependencies for this story]

## Definition of Done

- [ ] All tasks completed
- [ ] All acceptance criteria met
- [ ] Tests passing
- [ ] Code reviewed
- [ ] Documentation updated
```

#### Step 2.5: Generate Technical Sub-Specs

**Only create relevant sub-specs based on contract requirements:**

- **technical-spec.md**: Always created - architecture, patterns, dependencies
- **database-schema.md**: Only if database changes needed (determined during clarification)
- **api-spec.md**: Only if new API endpoints required
- **ui-wireframes.md**: Only if UI/UX requirements were discussed

**Cross-reference integration**: Each sub-spec references relevant user stories from the user-stories/ folder to maintain traceability between technical details and user value.

#### Step 2.6: Create User Stories Folder Structure

**user-stories/ folder** - Organized individual story files with focused task groups:

**Structure Philosophy:**

- Each user story gets its own file for better organization
- Implementation tasks are kept small and focused (max 5-7 per story)
- Complex stories are broken into multiple smaller stories
- README.md provides overview and progress tracking
- Acceptance criteria become verification checkpoints
- Each story follows TDD: test → implement → verify acceptance criteria

**Benefits of Folder Structure:**

- **Manageability**: Each file stays focused and readable
- **Navigation**: Easy to find and work on specific stories
- **Parallel Work**: Multiple developers can work on different stories
- **Version Control**: Smaller, focused diffs when stories change
- **Progress Tracking**: Clear visibility of completion status
- **Traceability**: Every technical task traces to user value

**File Organization:**

- **README.md**: Overview, progress summary, dependencies
- **story-N-{name}.md**: Individual stories with focused tasks (5-7 tasks max)
- **Story Naming**: Clear, descriptive names for easy identification
- **Task Numbering**: N.1, N.2, N.3... within each story file

**Task Breakdown Strategy:**

- If a story would have >7 tasks, split into multiple stories
- Each story should deliver standalone user value
- Tasks within a story should be cohesive and related
- Always start with tests (N.1 Write tests...)
- Always end with verification (N.X Verify acceptance criteria met)

#### Step 2.7: Final Package Review & User Validation

Present complete package with file references:

```
Specification package created successfully!

.code-captain/specs/[DATE]-feature-name/
├── spec.md - Main specification document
├── spec-lite.md - AI context summary
├── user-stories/ - Individual user story files
│   ├── README.md - Overview and progress tracking
│   ├── story-1-{name}.md - Focused story with 5-7 tasks
│   ├── story-2-{name}.md - Manageable task groups
│   └── story-N-{name}.md - Easy navigation and parallel work
└── sub-specs/
    ├── technical-spec.md - Technical requirements
    [Additional specs as created]

**Stories Created:** [N] user stories with focused task groups (max 5-7 tasks each)
**Total Tasks:** [X] implementation tasks across all stories
**Organization:** Each story is self-contained for better workflow management

Please take a moment to review the specification documents. The spec captures everything we discussed, including:
- [Brief summary of key features/requirements]
- [Notable technical approach or constraint]
- [Implementation approach or user story highlights]

Please read through the files and let me know:
- Does this accurately capture your vision?
- Are there any missing requirements or incorrect assumptions?
- Are the user stories appropriately sized (5-7 tasks each)?
- Should any stories be split further or combined?

The user-stories folder structure allows you to:
- Work on one story at a time for focused development
- Track progress easily with the README overview
- Assign different stories to different team members
- Keep task lists manageable and actionable

Once you're satisfied with the specification, I can help you start implementation with the first story, or we can make any needed adjustments.
```

## Key Improvements Over Original

### 1. Contract-First Approach

- **No presumptuous file creation** - Nothing gets built until contract is locked
- **Structured clarification** - One question at a time, building understanding
- **Echo check validation** - Clear contract summary before proceeding

### 2. Codebase-Aware Questioning

- **Context scanning between questions** - Each answer triggers fresh codebase analysis
- **Integration-focused queries** - Questions shaped by what exists in the codebase
- **Architecture consistency** - Recommendations align with existing patterns

### 3. User Control & Transparency

- **Clear decision points** - User explicitly approves before file creation
- **Risk assessment option** - Can explore implementation risks before committing
- **Blueprint preview** - Can see planned structure before creation
- **Edit capability** - Can modify contract before locking

### 4. Efficient Clarification Process

- **Gap enumeration** - Systematically identifies all unknowns
- **95% confidence threshold** - Stops asking when ready to deliver
- **Token efficiency** - Focused questions, no verbose explanations during clarification

## Example Usage Flow

```
Developer: Use code-captain subagent: create-spec "real-time multiplayer chat with blockchain integration"

Agent: I'm ready to help you create a comprehensive specification.

Let me first scan your codebase to understand the current architecture...

[Scans existing code, finds a simple React app with basic authentication]

I found your existing React application with basic user authentication, but I'm seeing some potential concerns with your request.

First question: You mentioned "real-time multiplayer chat with blockchain integration" - I see technical challenges with this combination. Real-time chat typically requires sub-100ms latency, but blockchain transactions can take seconds or minutes to confirm. What specific problem are you trying to solve with blockchain in a chat context?

Developer: I want messages to be permanently stored and verifiable, plus users should pay crypto to send messages to prevent spam

Agent: I understand the anti-spam goal, but I'm concerned about the user experience. If users have to wait 30+ seconds for transaction confirmation before each message appears, that breaks the "real-time" chat experience.

Would a hybrid approach work better - immediate message delivery with blockchain settlement in the background? Or are you thinking of a different model where users pre-purchase message credits?

Developer: Oh, that's a good point. Let's do the hybrid approach with background settlement

Agent: [Continues with more informed questions about the hybrid architecture...]

## Specification Contract

**Deliverable:** Hybrid real-time chat with immediate message delivery and background blockchain verification for anti-spam

**Must Include:** Sub-second message delivery while maintaining blockchain verification for spam prevention

**Hardest Constraint:** Balancing real-time UX with blockchain settlement delays and gas cost management

**Technical Concerns:**
- Gas costs could make casual chat expensive ($1-5 per message during network congestion)
- Background settlement failures need graceful handling and user notification
- Wallet integration adds authentication complexity to existing simple auth system

**Recommendations:**
- Consider Layer 2 solution (Polygon) to reduce gas costs to $0.01-0.10 per message
- Implement message batching to settle multiple messages in single transaction
- Add fallback mode for when blockchain settlement fails

**Success Criteria:** Messages appear instantly, spam is prevented via crypto payments, blockchain verification happens within 5 minutes

**Scope Boundaries:**
- Included: Real-time chat, wallet integration, background blockchain settlement
- Excluded: Advanced chat features (file sharing, voice), custom token creation

---
Options: [yes/edit/risks/blueprint]

Developer: yes

Agent: Contract locked! Creating specification package...

[Creates files that account for the technical concerns and hybrid architecture discussed]
```

This approach ensures that every specification is built on solid understanding rather than assumptions, while respecting the developer's time and maintaining control over the process.

---

## Claude Code Subagent Integration

### Delegation Patterns

The create-spec command works within Claude Code's subagent system through:

**Automatic Invocation**:
- Claude Code automatically delegates specification tasks to code-captain subagent
- Triggered by keywords: "create spec", "feature specification", "spec package"
- Proactive delegation for contract-first specification workflows

**Explicit Invocation**:
```bash
# Direct subagent invocation
> Use the code-captain subagent to create a spec for user authentication
> Have code-captain create a specification for the payment system
> Ask code-captain to generate a feature spec for notifications
```

### Subagent Workflow Integration

**Phase 1 - Contract Establishment**:
- Use `Read` and `Glob` tools to scan existing specs and project structure
- Use `Grep` to identify existing patterns and integration points
- Use `Task` tool for complex codebase analysis
- **No file creation** until contract is locked

**Phase 2 - Clarification Loop**:
- Use `Read` to load project context files
- Use `Grep` and `Glob` for context scanning between questions
- **Use `TodoWrite` immediately** when contract is locked to track spec creation progress

**Phase 3 - Spec Package Creation**:
- Use `Bash` tool for `npx @devobsessed/code-captain date` to get current date
- Use `Write` tool for creating specification files
- Use `Edit` tool for modifying existing documentation
- **Update todos** with `TodoWrite` as each spec file is completed

**Phase 4 - Validation**:
- Present complete package to user for review
- **Finalize todos** with `TodoWrite` marking all tasks as completed

### Context Preservation

Since subagents operate in separate contexts:
- **Document all decisions** in `.code-captain/specs/`
- **Maintain state** through structured file outputs
- **Provide clear handoffs** to subsequent commands (execute-task)
- **Reference project context** in all generated specification documents

---

## Implementation Notes

### Tool Integration

#### Core Claude Code Tools

**File Operations (No Permission Required)**:
- Use `Read` for reading existing files and spec scanning
- Use `Glob` for finding files based on pattern matching
- Use `Grep` for searching patterns in file contents and code discovery

**File Modification (Permission Required)**:
- Use `Edit` for creating and modifying specification files
- Use `Write` for creating new spec documents and folder structures

**System Operations (Permission Required)**:
- Use `Bash` for date retrieval (`npx @devobsessed/code-captain date`)
- Use `WebSearch` for technology research and best practices

**Advanced Operations (No Permission Required)**:
- Use `Task` for delegating complex multi-step analysis workflows
- Use `TodoWrite` for structured progress tracking and task management

### Output Locations & File Structure

#### Directory Structure

```
.code-captain/specs/[DATE]-{feature-name}/
├── spec.md                    # Main specification (from contract)
├── spec-lite.md              # Condensed version for AI context
├── user-stories/             # Individual user story files
│   ├── README.md             # Overview and progress tracking
│   ├── story-1-{name}.md     # Individual user story with focused tasks
│   ├── story-2-{name}.md     # Each story kept small and manageable
│   └── story-N-{name}.md     # Max 5-7 implementation tasks per story
└── sub-specs/                # Technical deep-dives
    ├── technical-spec.md     # Architecture & implementation details
    ├── database-schema.md    # Database changes (if needed)
    ├── api-spec.md          # API documentation (if needed)
    └── ui-wireframes.md     # UI/UX specifications (if needed)
```

### Todo Integration

Each phase should update todos to show progress, enabling Claude Code's todo tracking:

#### Example Todo Updates

```javascript
// Initialize todos when contract is locked
TodoWrite({
  todos: [
    { content: "Get current date and create spec folder structure", status: "in_progress", activeForm: "Creating spec folder structure" },
    { content: "Generate core specification document", status: "pending", activeForm: "Generating core specification" },
    { content: "Create user stories with acceptance criteria", status: "pending", activeForm: "Creating user stories" },
    { content: "Generate technical sub-specifications", status: "pending", activeForm: "Generating technical sub-specs" },
    { content: "Present package for user review", status: "pending", activeForm: "Presenting package for review" },
  ],
});

// Update when creating specification files
TodoWrite({
  todos: [
    { content: "Get current date and create spec folder structure", status: "completed", activeForm: "Creating spec folder structure" },
    { content: "Generate core specification document", status: "completed", activeForm: "Generating core specification" },
    { content: "Create user stories with acceptance criteria", status: "in_progress", activeForm: "Creating user stories" },
    { content: "Generate technical sub-specifications", status: "pending", activeForm: "Generating technical sub-specs" },
    { content: "Present package for user review", status: "pending", activeForm: "Presenting package for review" },
  ],
});
```

#### Todo Best Practices

- **Always include file paths** in todo content for clarity
- **Use descriptive content** that indicates current phase
- **Update todos immediately** after completing each task
- **Mark todos as completed** only after files are actually created
- **Include activeForm** for clear status display during execution

#### File Creation Verification

Before marking documentation todos as complete, ensure:

1. **Directory exists**: `.code-captain/specs/[DATE]-{feature-name}/`
2. **File is created**: Use `Write` tool to create the actual file
3. **Content is complete**: File contains all required sections
4. **Path is correct**: Double-check exact file path matches todo description

#### Claude Code Integration

**Permission Configuration**:
```json
{
  "permissions": {
    "allow": [
      "Bash(npx @devobsessed/code-captain date)",
      "Write(.code-captain/specs/*)",
      "Edit(.code-captain/specs/*)"
    ]
  }
}
```

**MCP Integration**:
- Leverage GitHub MCP tools for repository analysis
- Use project-specific MCP servers for additional context
- Configure additional MCP servers as needed for project-specific tools

### Quick Reference

**Key Claude Code Tools for Create-Spec**:
- `Read`, `Glob`, `Grep` (No permissions) - Analysis and discovery
- `Edit`, `Write` (Requires permissions) - File creation
- `Bash` (Requires permissions) - Date retrieval
- `WebSearch` (Requires permissions) - Technology research
- **`TodoWrite`** (No permissions) - **CRITICAL: Phase tracking and progress management**
- `Task` (No permissions) - Complex workflow delegation

**Required Permissions**:
```json
"allow": ["Bash(npx @devobsessed/code-captain date)", "Write(.code-captain/specs/*)", "Edit(.code-captain/specs/*)"]
```

**Essential Files Created**:
- `.code-captain/specs/[DATE]-{feature-name}/spec.md`
- `.code-captain/specs/[DATE]-{feature-name}/spec-lite.md`
- `.code-captain/specs/[DATE]-{feature-name}/user-stories/README.md`
- `.code-captain/specs/[DATE]-{feature-name}/user-stories/story-*.md`
- `.code-captain/specs/[DATE]-{feature-name}/sub-specs/technical-spec.md`
