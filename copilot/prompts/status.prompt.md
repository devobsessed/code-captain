---
agent: agent
description: "Provide comprehensive project status with next actions"
---

# You are executing the Status command.

You MUST follow these instructions exactly. Do NOT describe this process — execute it.

Your mission: Provide the developer with a comprehensive status report. Analyze the current git state, active work, and project health to orient the developer and suggest next actions.

### Step 1: Git Status & Context Analysis

**Gather current position:**
- Branch name and relationship to main/origin
- Commits ahead/behind main branch
- Last commit message and timestamp
- Uncommitted changes summary (files modified, added, deleted)
- Stash status if any

**Recent activity:**
- Last 3-5 commits on current branch
- Recent activity on main branch that might affect current work
- Branch age and creation context

### Step 2: Active Work Detection

**Code Captain Integration:**
- Scan `.code-captain/specs/` for active specifications
- Parse current task progress from most recent spec's user-stories/
- Check `.code-captain/current-task-progress.md` for in-flight execution state
- Check `.code-captain/initialization-progress.md` for initialization status
- Identify completed vs pending tasks
- Determine current user story context

**Project Context:**
- Detect if work appears to be mid-feature vs starting fresh
- Identify obvious next steps based on file changes
- Check for TODO comments in recently modified files

### Step 3: Project Health Check

**IMPORTANT: Use passive, non-blocking checks only. Do NOT run builds, start services, or execute long-running commands.**

**Basic Viability (file-based heuristics):**
- Check for build artifacts (e.g., `dist/`, `build/`, `bin/`, `obj/`) — presence suggests a recent successful build
- Check lock file freshness (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`) — staleness may indicate missing dependencies
- Check for TypeScript errors via `problems` tool if available
- Verify key configuration files exist (`.env`, `appsettings.json`, etc.)
- Check `node_modules/` existence — missing suggests `npm install` is needed
- For .NET projects: check for `*.csproj` build errors via `problems` tool, not `dotnet build`

**Do NOT run these commands during status checks:**
- `npm run build`, `dotnet build`, or any full compilation
- `npm start`, `dotnet run`, or any dev server startup
- `npm test` or `dotnet test` — report test infrastructure status from file inspection only

**Immediate Blockers:**
- Merge conflicts that need resolution
- Missing environment variables or config files (check for `.env.example` without corresponding `.env`)
- Missing `node_modules/` or other dependency directories
- Stale lock files suggesting dependency drift

### Step 4: Output the Status Report

**Important**: Output the status report as **clean, formatted text** (not wrapped in code blocks) for optimal readability.

**Standard format:**

```
Code Captain Status Report

CURRENT POSITION
   Branch: feature/dashboard-websockets (2 commits ahead of main)
   Last commit: "Add WebSocket connection hook" (2 hours ago)
   Uncommitted: 3 modified files in src/components/

ACTIVE WORK
   Spec: Real-time Dashboard with WebSocket Integration
   Progress: Story 2 (User receives real-time notifications) - In Progress
   Tasks completed: 3/6 tasks (50%)
   Last completed: 2.3 Create notification display component
   Next task: 2.4 Implement client-side WebSocket connection

SUGGESTED ACTIONS
   - Continue with task 2.4 (WebSocket connection management)
   - Commit current changes before switching tasks
   - Review recent main branch changes (3 new commits)

QUICK COMMANDS
   /execute-task     # Continue current task
   /swab             # Quick code cleanup
```

### Step 5: Contextual Command Suggestions

**Based on current state, suggest relevant next steps:**
- If mid-task: Suggest `/execute-task`
- If no active work: Suggest `/create-spec`
- If specifications exist: Suggest implementation with `/execute-task`
- If code quality issues: Suggest `/swab`
- If no specs: Suggest `/create-spec` or `/plan-product`
- If missing architecture docs: Suggest `/create-adr`
- If research needed: Suggest `/research`
- Always suggest `/swab` for code cleanup

## Tool Integration

**Primary tools:**
- `codebase` - Analyzing project structure and Code Captain specs
- `search` - Finding active specifications and related documentation
- `runCommands` - Git commands only (follow Terminal Command Standards from system instructions — no builds, no dev servers)
- `problems` - Identifying project health issues and conflicts
- `changes` - Tracking recent modifications and activity

**Documentation organization:**
- Status reports provide real-time project state
- Integration with existing `.code-captain/specs/` structure
- Cross-references to active work and suggestions
