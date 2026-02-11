---
agent: agent
description: "Create Architecture Decision Records with research and analysis"
---

# You are executing the Create ADR command.

You MUST follow these instructions exactly. Do NOT describe this process — execute it.

Your mission: Create a comprehensive Architecture Decision Record (ADR) that documents an architectural decision with clear rationale, alternatives considered, and consequences through a structured analysis and review process.

## When to Use

- Making significant architectural decisions that affect system structure or design
- Documenting technology choices with vendor lock-in or high switching costs
- Recording decisions contrary to team expectations or industry standards
- Capturing complex trade-offs between competing architectural approaches
- Establishing architectural patterns and standards for team consistency
- Onboarding new team members to architectural reasoning and context
- Creating audit trails for compliance and governance requirements

## Prerequisites

**MANDATORY:** Automatically execute research if no relevant research exists. The ADR creation process will:

1. Check for existing research on the decision topic
2. If no research found: **automatically read and execute** the complete research workflow from `/research`
3. Only proceed with ADR creation after research is completed and documented

### Step 0: Check for Existing Research and Auto-Execute if Missing

**Objective:** Ensure comprehensive research exists before creating ADR - automatically execute research if missing

**Actions:**

1. **Check for existing research:**

   - Use `search` to look for related research in `.code-captain/research/` directory
   - Search for research documents that might relate to the architectural decision
   - Use `codebase` to explore the research directory structure

2. **Automatic research execution if missing:**

   ```
   If no relevant research found:
   "No existing research found for this architectural decision.

   Architecture Decision Records require comprehensive research to document alternatives properly.

   AUTOMATICALLY EXECUTING RESEARCH WORKFLOW FIRST...

   Reading research workflow and executing complete research process..."
   ```

3. **Execute research workflow automatically:**

   - **IMMEDIATELY** execute the complete `/research` command
   - **CREATE** research document in `.code-captain/research/{date}-{topic}-research.md`
   - **ONLY CONTINUE** with ADR creation after research is completed

4. **Handle research workflow:**
   - If no research found: **AUTOMATICALLY execute complete research workflow first**
   - If existing research found: Load and reference it throughout the ADR process
   - If research is incomplete: Execute additional research before continuing

**Deliverables:**

- Research availability assessment
- **Completed research documentation** (auto-executed if missing)
- Research document ready for ADR reference

### Step 1: Analyze Decision Context and Current State

**Objective:** Understand the current architectural state and decision context before proceeding

**PREREQUISITE:** This step only begins AFTER Step 0 confirms research exists or completes automatic research execution

**CRITICAL:** If Step 0 executed research automatically, load and reference the newly created research document

**Analysis Actions:**

1. **Understand current architectural patterns:**

   - Use `codebase` with queries:
     - "What architectural patterns are currently in use?"
     - "How are similar decisions handled in the codebase?"
     - "What dependencies and integrations exist?"

2. **Find existing ADRs and documentation:**

   - Use `search` to find existing ADRs in `.code-captain/decision-records/` directory
   - Use `codebase` to explore system structure and identify affected components

3. **Gather decision context:**
   - Identify decision stakeholders and their concerns
   - Determine the specific decision that needs to be made and its urgency
   - Document current architectural context summary

**Deliverables:**

- Current architectural context summary
- Decision scope and stakeholder identification
- Existing ADR inventory and numbering

### Step 2: Define Decision Scope and Criteria

**Objective:** Clearly define what decision needs to be made and establish evaluation criteria

**Actions:**

1. **Define the specific architectural decision** requiring documentation

2. **Identify driving forces and constraints:**

   - Business requirements and goals
   - Technical constraints and limitations
   - Performance, security, and scalability requirements
   - Team skills and organizational capabilities
   - Timeline and budget constraints

3. **Establish decision criteria and priorities**

4. **Determine decision maker(s) and approval process**

5. **Set boundaries for the decision scope**

**Deliverables:**

- Clear problem statement
- Decision criteria and evaluation framework
- Stakeholder roles and responsibilities
- Decision timeline and process

### Step 3: Research Alternatives and Evaluate Options

**Objective:** Systematically research and evaluate alternative approaches

**Research Actions:**

1. **Leverage existing research (if found in Step 0):**

   - Review research documents from `.code-captain/research/` for relevant findings
   - Extract key insights, alternatives, and recommendations from prior research
   - Identify gaps in existing research that need additional investigation

2. **Conduct additional research as needed:**

   - Use `fetch` for external documentation and best practices
   - "[technology/pattern] architectural approaches"
   - "[decision area] best practices"
   - "[technology] vs [alternative] comparison"

3. **Use `codebase` to understand current implementation approaches**

4. **Identify and document alternative options:**
   - Current state/status quo option
   - Industry standard approaches
   - Innovative or emerging alternatives
   - Hybrid approaches combining multiple patterns

**Evaluation Framework:**

For each alternative, evaluate against established criteria:

- Technical feasibility and complexity
- Performance and scalability implications
- Security and compliance considerations
- Development effort and timeline
- Long-term maintenance and evolution
- Risk assessment and mitigation strategies

**Deliverables:**

- Comprehensive alternatives analysis
- Pros and cons evaluation matrix
- Risk assessment for each option
- Expert opinions and team input summary

### Step 4: Document ADR with Decision Rationale

**Objective:** Create comprehensive ADR documentation with clear decision rationale and consequences

**Preparation Actions:**

1. **Get current date:**

   ```bash
   npx @devobsessed/code-captain date
   ```

2. **Determine ADR number:**

   - Check existing ADRs in `.code-captain/decision-records/` directory
   - Use sequential numbering (0001, 0002, etc.)

3. **Create ADR directory structure:**

   Create the decision records directory using `runCommands`

**ADR Creation:**

Create markdown file: `.code-captain/decision-records/NNNN-decision-title.md` using `editFiles`

**ADR Document Template:**

```markdown
# NNNN. [Decision Title]

**Date:** [Use output from npx @devobsessed/code-captain date]

**Status:** [Proposed/Accepted/Deprecated/Superseded]

**Deciders:** [Names or roles of decision makers]

**Technical Story:** [Brief reference to related issue, epic, or requirement]

## Context and Problem Statement

[Describe the architectural problem or decision that needs to be made. Include the business context, technical context, and driving forces that led to this decision being necessary.]

### Driving Forces

- **Business Driver 1:** [e.g., Need to support 10x user growth]
- **Technical Driver 2:** [e.g., Current monolith becoming unmaintainable]
- **Organizational Driver 3:** [e.g., Team scaling requires better separation of concerns]

### Assumptions

- [Any assumptions made during the decision process]
- [External dependencies or constraints assumed to remain stable]

## Decision Drivers

[List the key factors that influenced this architectural decision, in order of importance]

- **Driver 1:** [e.g., Scalability requirements]
- **Driver 2:** [e.g., Team autonomy and development velocity]
- **Driver 3:** [e.g., Technology stack modernization]
- **Driver 4:** [e.g., Operational complexity management]

## Considered Options

### Option 1: [Name of option]

**Description:** [Brief description of this approach]

**Pros:**
- [Positive aspect 1]
- [Positive aspect 2]

**Cons:**
- [Negative aspect 1]
- [Negative aspect 2]

**Effort:** [Implementation effort assessment]
**Risk:** [Risk level and key risks]

### Option 2: [Name of option]

**Description:** [Brief description of this approach]

**Pros:**
- [Positive aspect 1]
- [Positive aspect 2]

**Cons:**
- [Negative aspect 1]
- [Negative aspect 2]

**Effort:** [Implementation effort assessment]
**Risk:** [Risk level and key risks]

### Option 3: [Name of option]

**Description:** [Brief description of this approach]

**Pros:**
- [Positive aspect 1]
- [Positive aspect 2]

**Cons:**
- [Negative aspect 1]
- [Negative aspect 2]

**Effort:** [Implementation effort assessment]
**Risk:** [Risk level and key risks]

## Decision Outcome

**Chosen Option:** [Selected option with brief rationale]

### Rationale

[Detailed explanation of why this option was selected over the alternatives. Reference the decision drivers and how this option best addresses them.]

### Confirmation

[How will we know this decision is working? What metrics or indicators will we monitor?]

## Consequences

### Positive Consequences

- [Positive outcome 1]
- [Positive outcome 2]
- [Positive outcome 3]

### Negative Consequences

- [Negative outcome 1]
- [Negative outcome 2]
- [Negative outcome 3]

### Mitigation Strategies

- [Strategy 1 for addressing negative consequences]
- [Strategy 2 for managing introduced complexities]

## Implementation Notes

### Prerequisites

- [What needs to be in place before implementing this decision]
- [Dependencies that must be resolved first]

### Implementation Steps

1. [Step 1 - immediate actions required]
2. [Step 2 - follow-up activities]
3. [Step 3 - validation and monitoring setup]

### Success Criteria

- [Measurable criteria for successful implementation]
- [Timeline for achieving implementation milestones]

## Follow-up Actions

- [Action item 1 with owner and timeline]
- [Action item 2 with owner and timeline]
- [Review date for evaluating decision effectiveness]

## References

- [Link to related ADRs]
- [Prior research documents from .code-captain/research/ (if applicable)]
- [External documentation, articles, or research]

## Related Decisions

- [ADR-XXXX: Related decision that influences this one]
- [ADR-YYYY: Decision that this one supersedes or is superseded by]
```

**Review and Finalization:**

1. **Review ADR with stakeholders and decision makers**
2. **Update ADR status based on team consensus and approval**
3. **Link related ADRs to show decision evolution**
4. **Commit ADR to version control**

**Deliverables:**

- Comprehensive ADR document in `.code-captain/decision-records/NNNN-decision-title.md`
- Stakeholder review and approval record
- Updated completion status

## Tool Integration

**Primary tools:**

- `codebase` - Understanding existing architecture and patterns
- `search` - Finding existing ADRs and related documentation
- `editFiles` - Creating ADR documents
- `runCommands` - Getting date and creating directories
- `fetch` - Retrieving external research and documentation

**Documentation organization:**

- ADRs stored in `.code-captain/decision-records/`
- Research documents in `.code-captain/research/`
- Sequential numbering for easy reference
