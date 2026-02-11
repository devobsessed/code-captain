---
agent: agent
description: "Modify existing feature specifications with change tracking"
---

# You are executing the Edit Spec command.

You MUST follow these instructions exactly. Do NOT describe this process — execute it.

Your mission: Modify an existing feature specification safely and precisely using a contract-first approach. Establish complete alignment on the modifications before updating any files.

### Phase 1: Specification Loading & Change Contract (No File Modifications)

#### Step 1.1: Specification Discovery & Loading

**Locate Target Specification:**
1. **SCAN** `.code-captain/specs/` directory for all existing specifications
2. **IF** spec-identifier provided:
   - **SEARCH** for exact folder name match: `[DATE]-{spec-identifier}`
   - **SEARCH** for partial name match in folder names
   - **SEARCH** for identifier in spec.md titles/content
3. **IF** spec-identifier is "latest":
   - **FIND** most recent folder by date prefix
4. **IF** no spec-identifier provided:
   - **LIST** all available specifications for user selection
5. **IF** multiple matches found:
   - **PRESENT** options for user disambiguation

**Load Current State:**
1. **READ** primary specification file (`spec.md`)
2. **READ** user stories overview (`user-stories/README.md`)
3. **READ** all individual story files in `user-stories/` directory
4. **READ** all sub-specifications in `sub-specs/` directory
5. **SCAN** codebase for any implementation progress related to this spec
6. **OUTPUT:** Current specification summary with story status (no modifications yet)

#### Step 1.2: Impact Analysis & Change Assessment

**Internal Process (not shown to user):**
- Analyze proposed changes against current specification
- Identify affected individual story files and task groups
- Note potential ripple effects on:
  - Existing implementation (if any)
  - Specific user story files in user-stories/ folder
  - Story dependencies and sequencing
  - Technical architecture
  - Acceptance criteria within affected stories
  - Project timelines and story priorities
- Catalog modification domains:
  - Scope changes (adding/removing/splitting stories)
  - Technical approach modifications
  - Individual story adjustments or combinations
  - Task group reorganization (keeping 5-7 tasks max)
  - Performance/security requirement changes
  - Integration point modifications
  - Success criteria updates within stories

#### Step 1.3: Change Clarification Loop

**Rules:**
- Ask ONE focused question at a time about the proposed changes
- After each answer, re-analyze the existing spec and codebase for new context
- Continue until reaching 95% confidence on modification impact
- Each question should target the highest-impact unknown or risk
- **Never declare "final question"** - let the conversation flow naturally
- **Challenge changes that could break existing functionality or create technical debt**

**Critical Analysis Responsibility:**
- If proposed changes conflict with existing implementation, explain impact and suggest migration strategies
- If scope changes affect other dependent specifications, identify and discuss dependencies
- If modifications introduce technical complexity, assess if benefits justify the cost
- If changes affect user stories that may already be in progress, surface timeline implications
- If proposed changes contradict original business value, question the modification rationale

**Risk Assessment Categories:**
- **Breaking Changes**: Will this break existing functionality?
- **Implementation Impact**: How much existing work needs to be modified/discarded?
- **Architecture Consistency**: Do changes align with existing patterns?
- **Scope Creep**: Are we expanding beyond the original contract boundaries?
- **Business Value**: Do changes improve or compromise original user value?

#### Step 1.4: Modification Contract Proposal

When confident about changes, present a modification contract:

**Format:**
```
## Modification Contract

**Target Specification:** [Specification name and date]

**Proposed Changes:** [Clear description of what will be modified]

**Change Type:** [Addition/Removal/Modification/Refactor]

**Impact Assessment:**
- **Story Files Affected:** [List of specific story-N-{name}.md files that need changes]
- **New Stories Required:** [Any additional story files to be created]
- **Stories to Remove/Combine:** [Any story files that become obsolete]
- **Task Groups Affected:** [Which task groups within stories need modification]
- **Technical Components Affected:** [Code/architecture areas needing updates]
- **Implementation Status:** [How much existing work across stories is affected]

**Migration Strategy:**
- [How to handle existing implementation]
- [Steps to preserve completed work]
- [Rollback plan if needed]

**Updated Success Criteria:** [How success metrics change]

**Revised Scope Boundaries:**
- **Still In Scope:** [What remains from original]
- **Now In Scope:** [What gets added]
- **Removed From Scope:** [What gets removed]
- **Still Out of Scope:** [Unchanged exclusions]

**Risks & Concerns:**
- [Specific technical or business risks from the changes]
- [Potential complications or dependencies]

**Recommendations:**
- [Suggestions for safer implementation approaches]
- [Ways to minimize disruption to existing work]

**Effort Estimate:** [How much additional/changed work is involved]

---
Options:
- Type 'yes' to lock this modification contract and update the specification
- Type 'edit: [your changes]' to modify the contract
- Type 'compare' to see a detailed before/after comparison
- Type 'risks' to explore implementation risks in detail
- Type 'rollback' to understand how to undo these changes later
- Ask more questions if anything needs clarification
```

### Phase 2: Specification Update (Post-Agreement Only)

**Triggered only after user confirms modification contract with 'yes'**

#### Step 2.1: Create Backup & Change Documentation

**Backup Process:**
1. **CREATE** backup folder: `.code-captain/specs/[spec-folder]/backups/`
2. **COPY** all current files to `backups/[timestamp]/`
3. **CREATE** change log entry in `CHANGELOG.md` within spec folder

**Change Log Format:**
```markdown
# Specification Change Log

## [Date] - [Change Type]
**Modified by:** [User identifier or "Manual edit"]
**Modification Contract:** [Brief summary]

### Changes Made:
- [Specific change 1]
- [Specific change 2]

### Files Updated:
- spec.md - [what changed]
- user-stories/README.md - [progress tracking updates]
- user-stories/story-N-{name}.md - [specific story changes]
- sub-specs/[file] - [what changed]

### Backup Location:
`backups/[timestamp]/`

---
```

#### Step 2.2: Update Core Specification Files

**spec.md Updates:**
- Modify contract summary to reflect new agreement
- Update detailed requirements based on clarification
- Revise implementation approach if changed
- Add change log reference
- Update status if appropriate

**user-stories/ folder Updates:**
- **README.md**: Update progress tracking table and story dependencies
- **Individual story files**: Modify affected story-N-{name}.md files
- **Story additions**: Create new story files with focused task groups (5-7 tasks max)
- **Story combinations**: Merge related stories if they become too granular
- **Story removals**: Archive or delete story files no longer needed
- **Task reorganization**: Ensure task groups within stories remain manageable
- **Status updates**: Mark completed tasks that might need rework across all stories

#### Step 2.3: Update Technical Sub-Specifications

**Selective Updates:**
- Only update sub-specs affected by the changes
- Create new sub-specs if new technical areas introduced
- Archive sub-specs no longer relevant
- Update cross-references between documents

#### Step 2.4: Story-Based Task Reconciliation

**Task Status Assessment Across Stories:**
- **Review each story file** for task status and relevance
- **Identify completed tasks** within stories that remain valid
- **Flag tasks requiring rework** due to changes
- **Add new tasks** while maintaining 5-7 task limit per story
- **Split stories** if task count would exceed 7 tasks
- **Combine stories** if task counts become too small
- **Reorder stories** if dependencies changed

#### Step 2.5: Final Update Review & Validation

Present updated package with change summary showing files modified, stories added/removed/archived, task groups reorganized, and total task count.

The original version is safely backed up in the backups folder. If the user needs to rollback any changes, offer to help restore from backup.

## Tool Integration

**Primary tools:**
- `codebase` - Analyzing existing architecture and implementation progress
- `search` - Finding existing specifications and related documentation
- `editFiles` - Updating specification documents and story files
- `runCommands` - Creating backups and directory operations

**Documentation organization:**
- Specifications stored in `.code-captain/specs/[DATE]-{feature-name}/`
- Backup system for safe modification tracking
- Change logs for audit trail and rollback capability
- User stories organized in individual files for better management
