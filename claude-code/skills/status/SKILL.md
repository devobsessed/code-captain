---
name: status
mode: agent
description: Show a comprehensive project status report with git state, active specs, and suggested next actions
argument-hint: ""
---

# Status

## Overview

Provides a comprehensive status report when starting work or switching context. Analyzes current git state, active work, and project health to orient developers and suggest next actions.

## Process

### Step 1: Git Status & Context Analysis

**Current Position:**

Run the following using `Bash`:

```bash
git status --porcelain              # File changes
git log --oneline -5                # Recent commits
git log main..HEAD --oneline        # Commits ahead of main
git log HEAD..main --oneline        # Commits behind main
git stash list                      # Stashed changes
git branch -v                       # Branch info
```

Extract:
- Branch name and relationship to main/origin
- Commits ahead/behind main branch
- Last commit message and timestamp
- Uncommitted changes summary (files modified, added, deleted)
- Stash status if any

**Recent Activity:**
- Last 3-5 commits on current branch
- Recent activity on main branch that might affect current work

### Step 2: Active Work Detection

**Code Captain Integration:**

Use `Bash` to scan for active specifications:

```bash
# Find most recent spec directory
ls -t .code-captain/specs/*/spec.md 2>/dev/null | head -1

# Find all story files in most recent spec
ls .code-captain/specs/*/user-stories/story-*.md 2>/dev/null
```

Use `Read` to load:
- `user-stories/README.md` for story overview and progress
- The active story file for current task context

**Task Progress Parsing:**

For each story file, parse:
```bash
# Count completed tasks
grep -c "^\- \[x\]" story-file.md

# Count total tasks
grep -c "^\- \[[x ]\]" story-file.md

# Find next incomplete task
grep -n "^\- \[ \]" story-file.md | head -1
```

**Project Context:**
- Detect if work appears to be mid-feature vs starting fresh
- Use `Grep` to identify TODO comments in recently modified files

### Step 3: Project Health Check

**Basic Viability** (use `Bash`):
- Check for common dependency files (`package.json`, `requirements.txt`, etc.)
- Verify critical config files exist

**Immediate Blockers:**
```bash
# Check for merge conflicts
git diff --check
grep -r "<<<<<<" . --include="*.{js,ts,py,cs,go}" 2>/dev/null | head -5
```

### Step 4: Present Status Report

**Output as clean, formatted text** (not wrapped in code blocks) directly in the chat response. Use Unicode characters and box-drawing characters for visual appeal.

**Standard Status Report:**

```
⚓ Code Captain Status Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 CURRENT POSITION
   Branch: [branch-name] ([N commits ahead/behind of main])
   Last commit: "[message]" ([time ago])
   Uncommitted: [N modified files in path/]

📋 ACTIVE WORK
   Spec: [Specification name]
   Progress: Story [N] ([story name]) - [status]
   Tasks completed: [N/total] tasks ([%])
   Last completed: [task description] ✅
   Next task: [task description]

🎯 SUGGESTED ACTIONS
   • [Action based on current state]
   • [Action based on current state]

⚡ QUICK COMMANDS
   /execute-task     # Continue current task
   /swab             # Quick code cleanup
```

**Clean State Example:**

```
⚓ Code Captain Status Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 CURRENT POSITION
   Branch: main (up to date)
   Last commit: "Fix user authentication bug" (1 day ago)
   Working directory: Clean ✅

📋 ACTIVE WORK
   No active specifications found
   Ready to start new work

🎯 SUGGESTED ACTIONS
   • Start new feature development
   • Review pending issues or backlog

⚡ QUICK COMMANDS
   /create-spec      # Plan new feature
   /swab             # Clean up existing code
```

**Problem State Example:**

```
⚓ Code Captain Status Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 CURRENT POSITION
   Branch: feature/payment-flow (5 commits ahead, 2 behind main)
   Last commit: "WIP: payment validation" (3 days ago)
   Uncommitted: 7 modified files, 2 conflicts

⚠️  IMMEDIATE ATTENTION
   • Merge conflicts in src/api/payments.js, package.json
   • Branch is 2 commits behind main (potential conflicts)
   • Stashed changes from 2 days ago

📋 ACTIVE WORK
   Spec: Payment Processing Integration
   Progress: Story 1 (User completes payment flow) - In Progress
   Tasks completed: 3/5 tasks (60%)
   Next task: 1.4 Validate payment with external API

🎯 SUGGESTED ACTIONS
   • Resolve merge conflicts first
   • Sync with main branch changes
   • Review stashed changes for relevance

⚡ QUICK COMMANDS
  /execute-task     # Continue current task
  /swab            # Code cleanup
```

## Command Suggestion Logic

Based on project state, suggest relevant next steps:

1. **Is there a merge conflict?** → Suggest conflict resolution
2. **Is working directory dirty?** → Suggest commit or stash
3. **Is branch behind main?** → Suggest sync
4. **Is there an active task?** → Suggest `/execute-task`
5. **Is current task complete?** → Suggest next task
6. **No active work?** → Suggest `/create-spec` or `/plan-product`
7. **Code quality issues?** → Suggest `/swab`
8. **Missing architecture docs?** → Suggest `/create-adr`
9. **Research needed?** → Suggest `/research`
10. **Always:** → Show `/swab` for cleanup

## Error Handling

### Not a Git Repository

```
❌ Not in a git repository
   Initialize git first: git init
```

### No Code Captain Structure

```
⚓ Code Captain Status Report
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 CURRENT POSITION
   Branch: main (up to date)
   Working directory: Clean ✅

📋 ACTIVE WORK
   No Code Captain specifications found

🎯 SUGGESTED ACTIONS
   • Set up Code Captain workflow
   • Create first feature specification

⚡ QUICK COMMANDS
   /initialize       # Initialize Code Captain
   /create-spec      # Create first specification
```

## Story Status Detection

Parse story status from header:
- `Not Started` - No tasks completed
- `In Progress` - Some tasks completed, some remaining
- `Completed ✅` - All tasks and acceptance criteria completed

**Active Work Prioritization:**

1. **Multiple specs exist**: Show the most recently modified spec
2. **Single spec, multiple stories**: Show the story with "In Progress" status, or first "Not Started" story
3. **All stories complete**: Show overall completion status and suggest next actions
4. **No specs found**: Indicate no Code Captain specifications exist

## Security & Privacy

- All analysis happens locally
- No external API calls or data transmission
- Git history and file contents remain private
- Avoid displaying sensitive data from commit messages
