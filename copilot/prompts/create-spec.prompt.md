---
agent: agent
description: "Generate feature specifications using a contract-first approach"
---

# You are executing the Create Spec command.

You MUST follow these instructions exactly. Do NOT describe this process — execute it.

Your mission: Turn the user's rough feature idea into a clear work specification using a contract-first approach. Establish complete alignment through structured clarification rounds before creating any files.

### Phase 1: Contract Establishment (No File Creation)

#### Step 1.1: Initial Context Scan

- Scan existing `.code-captain/specs/` for related specifications
- Analyze current codebase architecture and patterns using `codebase`
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
- After each answer, re-scan codebase for new context if relevant
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
- In Scope: [2-3 key features]
- Out of Scope: [2-3 things we won't build]

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

#### Step 2.1: Determine Current Date

Get current date by running: `npx @devobsessed/code-captain date`

This returns the current date in `YYYY-MM-DD` format for folder naming:
`.code-captain/specs/[DATE]-[feature-name]/`

#### Step 2.2: Create Directory Structure

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

#### Step 2.3: Generate Core Documents

**spec.md** - Built directly from the locked contract:

```markdown
# [Feature Name] Specification

> Created: [DATE from Step 2.1 determination process]
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

#### Step 2.4: Generate Technical Sub-Specs

**Only create relevant sub-specs based on contract requirements:**

- **technical-spec.md**: Always created - architecture, patterns, dependencies
- **database-schema.md**: Only if database changes needed (determined during clarification)
- **api-spec.md**: Only if new API endpoints required
- **ui-wireframes.md**: Only if UI/UX requirements were discussed

**Cross-reference integration**: Each sub-spec references relevant user stories from the user-stories/ folder to maintain traceability between technical details and user value.

#### Step 2.5: Create User Stories Folder Structure

Each user story gets its own file for better organization. Keep implementation tasks small and focused (max 5-7 per story). Complex stories should be broken into multiple smaller stories. Each story follows TDD: test, implement, verify acceptance criteria.

**Task Breakdown Strategy:**

- If a story would have >7 tasks, split into multiple stories
- Each story should deliver standalone user value
- Tasks within a story should be cohesive and related
- Always start with tests (N.1 Write tests...)
- Always end with verification (N.X Verify acceptance criteria met)

#### Step 2.6: Final Package Review & User Validation

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

Please take a moment to review the specification documents. The spec captures everything we discussed, including:
- [Brief summary of key features/requirements]
- [Notable technical approach or constraint]
- [Implementation approach or user story highlights]

Please read through the files and let me know:
- Does this accurately capture your vision?
- Are there any missing requirements or incorrect assumptions?
- Are the user stories appropriately sized (5-7 tasks each)?
- Should any stories be split further or combined?

Once you're satisfied with the specification, I can help you start implementation with the first story, or we can make any needed adjustments.
```

## Tool Integration

**Primary tools:**

- `codebase` - Scanning existing architecture and patterns
- `search` - Finding related specifications and documentation
- `editFiles` - Creating specification documents
- `runCommands` - Date determination and directory creation
- `fetch` - External research for best practices

**Documentation organization:**

- Specifications stored in `.code-captain/specs/[DATE]-{feature-name}/`
- User stories organized in individual files for better management
- Technical sub-specs created only when relevant

## Example of expected interaction

```
Developer: /create-spec "real-time multiplayer chat with blockchain integration"

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

...

Developer: yes

Agent: Contract locked! Creating specification package...

[Creates files that account for the technical concerns and hybrid architecture discussed]
```
