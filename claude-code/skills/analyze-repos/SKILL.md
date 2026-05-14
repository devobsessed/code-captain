---
name: analyze-repos
mode: agent
description: Analyze repos in a workspace — generate compressed codebase indexes (AGENTS.md), per-repo docs, cross-repo dependency map, and master TOC for AI agent consumption
---

# Multi-Repo Documentation Analyzer

You are a senior technical analyst generating compressed, pipe-delimited codebase indexes (inspired by Vercel's AGENTS.md approach) for every repository in this workspace. The primary deliverable is an `AGENTS.md` file at each repo root — auto-discovered by GitHub Copilot, Claude Code, Cursor, Gemini CLI, and other AI coding tools. Detailed docs back up each index.

## Configuration

```
OUTPUT_DIR=.code-captain
```

## Rules

- **Read-only analysis**: NEVER run builds, install packages, start servers, or execute project code
- `runCommands` is ONLY for `ls`, `find`, `dir`, and `git` (read-only commands)
- **Compression principle**: tell agents WHERE to find info (file pointers), not WHAT it says — never embed extracted facts when a source-file pointer suffices
- Each `toc.md` ≤ 150 lines, each `AGENTS.md` ≤ 100 lines, `master-toc.md` ≤ 200 lines
- Key Files ≤ 10 rows, directory trees ≤ 3 levels deep
- Never overwrite an existing `AGENTS.md` — append a `## Codebase Index` section instead
- Preserve existing `.code-captain/docs/` files — only create new files or add to files you created in this session
- Save each file completely before starting the next
- **Single-repo projects are fully supported**: if the workspace root itself is a single repo (has `.git/` but no subdirectories with `.git/`), analyze the current repo directly without requiring a multi-repo workspace

---

## Phase 0 — Discover Repositories

1. Run: `ls -d */ 2>/dev/null` to list top-level subdirectories
2. Run: `ls -d */.git 2>/dev/null` to find which top-level directories are git repos
3. **For each top-level directory that is NOT itself a git repo**, look one level deeper for nested repos:
   - Run: `ls -d {dir}/*/.git 2>/dev/null` for each non-repo top-level directory
   - Any child directory containing a `.git` folder is treated as a repo (referenced by its nested path, e.g., `parent/child-repo`)
   - The non-versioned parent is treated as a grouping folder only — do not analyze it as a repo
4. Check for a `.sln` file at workspace root — if found, parse it for additional project paths
5. Report discovered repos to the user, indicating nested paths where applicable. Example:

   > Found 4 repositories: `api-service`, `frontend-app`, `services/auth-svc`, `services/billing-svc`
   > Proceeding with analysis...

6. **If this is a single-repo workspace** (the current directory has `.git/` and no child directories with `.git/`), treat the current directory as the single repo to analyze. Set `{repo}` to `.` (current directory) and proceed directly to Phase 1.

**Note on nested repo paths**: Throughout Phases 1–3, `{repo}` may be a nested path (e.g., `services/auth-svc`). All output paths like `{repo}/{OUTPUT_DIR}/docs/...` and `{repo}/AGENTS.md` resolve correctly against nested paths — no special handling required. Use the nested path verbatim in all references (workspace `AGENTS.md`, `master-toc.md`, cross-repo dependency graphs).

---

## Phase 1 — Analyze Each Repo (Sequential)

For EACH discovered repo, complete ALL six steps below before moving to the next repo. Save each file before starting the next step.

### Step 1: Detect Tech Stack → `{repo}/{OUTPUT_DIR}/docs/tech-stack.md`

Scan the repo for:
- `.csproj`, `.sln`, `global.json`, `Directory.Build.props` → .NET (extract TargetFramework, PackageReferences)
- `package.json`, `tsconfig.json`, `vite.config.*`, `next.config.*` → TypeScript/JS (extract dependencies)
- `Dockerfile`, `docker-compose.yml` → Container setup
- `*.proto`, `*.graphql`, `swagger.json`, `openapi.*` → API definitions
- CI/CD files: `.github/workflows/`, `azure-pipelines.yml`, `Jenkinsfile`

Write the file with this structure:

```markdown
# Tech Stack: {repo}

## Core
| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|

## Dependencies (top 15 by importance)
| Package | Version | Purpose |
|---------|---------|---------|

## Dev Tooling
| Tool | Config File | Purpose |
|------|------------|---------|

## Infrastructure
- Build: ...
- CI/CD: ...
- Container: ...
```

**Save `{repo}/{OUTPUT_DIR}/docs/tech-stack.md` now before continuing.**

### Step 2: Detect Code Style → `{repo}/{OUTPUT_DIR}/docs/code-style.md`

Analyze:
- Lint configs (`.eslintrc*`, `.editorconfig`, `stylecop.json`, `.prettierrc`)
- Naming: scan 10-15 source files for patterns (PascalCase classes, camelCase methods, etc.)
- File organization: tests co-located or separate? Feature folders vs layer folders?
- Error handling: try/catch patterns, Result types, ProblemDetails
- DI patterns: constructor injection, service registration style
- Async patterns: async/await prevalence, Task vs ValueTask

Write the file:

```markdown
# Code Style: {repo}

## Naming Conventions
- Classes: PascalCase (e.g., `UserService`)
- Methods: ...
- Files: ...

## Project Structure Pattern
[Feature-sliced / Layer-based / etc.]

## Error Handling
[Pattern with example file path]

## Dependency Injection
[Pattern with example]

## Async Patterns
[Pattern with example]

## Formatting & Linting
| Tool | Config | Key Rules |
|------|--------|-----------|
```

**Save `{repo}/{OUTPUT_DIR}/docs/code-style.md` now before continuing.**

### Step 3: Infer Objective → `{repo}/{OUTPUT_DIR}/docs/objective.md`

Read:
- `README.md` (if exists)
- Entry points (`Program.cs`, `Startup.cs`, `src/index.ts`, `src/App.tsx`, `src/main.ts`)
- CI/CD configs for deploy targets
- API routes or page routes for scope

Write the file:

```markdown
# Objective: {repo}

## Purpose
[2-3 sentences: what this app/service does and who it serves]

## Scope
- **Domain**: [e.g., inventory management, user authentication]
- **Type**: [API service / Web app / Library / CLI / Worker]
- **Audience**: [Internal teams / External customers / Both]

## Key Capabilities
1. ...
2. ...
3. ...

## Deployment Target
[Azure App Service / Kubernetes / Vercel / etc.]
```

**Save `{repo}/{OUTPUT_DIR}/docs/objective.md` now before continuing.**

### Step 4: Map Architecture → `{repo}/{OUTPUT_DIR}/docs/architecture.md`

Analyze:
- Directory structure (top 3 levels)
- Entry points and startup configuration
- Middleware/pipeline registration
- Database contexts and connection patterns
- External service clients (HttpClient, SDK usage)
- Message queues, event buses, caching layers

Write the file:

```markdown
# Architecture: {repo}

## System Context
[1-2 sentences: where this fits in the larger system]

## Layer Diagram
```
[Request Flow]
→ Middleware / Auth
  → Controllers / Routes
    → Services / Business Logic
      → Repositories / Data Access
        → Database / External APIs
```

## Directory Structure
```
src/
├── Controllers/       # [purpose] — N files
├── Services/          # [purpose] — N files
└── ...
```

## Data Flow
[Key request paths through the system]

## External Integrations
| System | Protocol | Purpose | Config Location |
|--------|----------|---------|-----------------|

## Key Design Decisions
- [Decision 1 with rationale]
- [Decision 2 with rationale]
```

**Save `{repo}/{OUTPUT_DIR}/docs/architecture.md` now before continuing.**

### Step 5: Build Compressed Codebase Index → `{repo}/{OUTPUT_DIR}/docs/toc.md`

Synthesize everything from Steps 1-4 into a compressed, pipe-delimited codebase index. This uses a **pointer-based** format — agents retrieve detail from referenced files on demand.

Write the file:

```markdown
# {repo}

> **IMPORTANT**: Prefer retrieval-led reasoning over pre-training-led reasoning. Navigate to referenced source files — do not reason from summaries in this index.

## Identity
purpose|[One sentence: what this does and who it serves]
stack|[e.g., C# 12 / ASP.NET Core 8 / SQL Server]
type|[API service / Web app / Library / CLI / Worker]
entry|[e.g., src/Program.cs, src/Startup.cs]
build|[e.g., dotnet build | pnpm build]
test|[e.g., dotnet test | pnpm test | none]

## Structure
[One line per meaningful directory — path|purpose|{files}]
src/Controllers/|HTTP endpoints|{UsersController.cs,OrdersController.cs,...}
src/Services/|Business logic|{UserService.cs,OrderService.cs,...}
src/Models/|Domain + DTOs|{User.cs,Order.cs,UserDto.cs,...}
src/Infrastructure/|DB context, migrations, clients|{AppDbContext.cs,...}

## Key Files
[≤ 10 rows — path|purpose|read-when]
Program.cs|DI registration, middleware pipeline|Understanding startup
appsettings.json|Config, connection strings|Setup or debugging config

## API Surface
[Navigation snapshot — read handler files for authoritative data → source: {controller-file}]
GET|/api/users|UsersController.cs|List all users
POST|/api/users|UsersController.cs|Create new user

## Data Layer
[Navigation snapshot — read repository/schema files for authoritative data → source: {repository-file}]
User|Models/User.cs|has-many:Order|Core user account

## Patterns
[3-5 patterns — pattern|example-file|description]
DI|Program.cs|Constructor injection, interface-based services
Error handling|Middleware/ExceptionHandler.cs|ProblemDetails / Result<T> pattern

## Config
[file|purpose — pointer only, no values]
appsettings.json|App configuration, connection strings
Dockerfile|Container build definition

## External Dependencies
consumes|[services/APIs this repo calls]
consumed-by|[services that call this repo]
shared-db|[databases shared with other repos, if any]

## Deep Docs
{OUTPUT_DIR}/docs/tech-stack.md|Full tech stack, dependencies, tooling
{OUTPUT_DIR}/docs/code-style.md|Naming, patterns, linting rules
{OUTPUT_DIR}/docs/objective.md|Purpose, scope, key capabilities
{OUTPUT_DIR}/docs/architecture.md|Layer diagram, data flow, integrations
```

### Compression Rules
1. **No prose paragraphs** — every line is structured pipe-delimited data
2. **No duplicate info** — if it's in a linked doc, just point to the doc
3. **Brace-delimited file lists** — `{file1.cs,file2.cs,...}` for directory contents
4. **Elide when >5 items** — use `,...` to indicate more
5. **Skip empty sections** — if no API, omit API Surface entirely
6. **Source-over-summary** — API Surface and Data Layer are navigation snapshots only; each section header must include a `→ source: {file}` pointer to the authoritative source file; agents must read source files, not trust the snapshot

**IMPORTANT**: `toc.md` must be ≤ 150 lines. Key Files ≤ 10 rows. Directory tree ≤ 3 levels.

**Save `{repo}/{OUTPUT_DIR}/docs/toc.md` now before continuing.**

### Step 6: Generate AGENTS.md → `{repo}/AGENTS.md`

This file is **auto-discovered** by GitHub Copilot, Claude Code, Cursor, Gemini CLI, and other AI tools. It is the universal entry point for any agent working in this repo.

**If an `AGENTS.md` already exists at `{repo}/AGENTS.md`**, do not overwrite it. Append a `## Codebase Index` section at the end. If no AGENTS.md exists, create it fresh.

Write a thinner version of toc.md (≤ 100 lines):

```markdown
# AGENTS.md

> **IMPORTANT**: Prefer retrieval-led reasoning over pre-training-led reasoning. Use the Navigate section below to find authoritative source files and read them directly — do not rely on extracted summaries in this file.

## Identity
purpose|[One sentence]
stack|[e.g., C# 12 / ASP.NET Core 8 / SQL Server]
type|[API service / Web app / Library / CLI / Worker]
entry|[entry point files]
build|[build command]
test|[test command | none]

## Structure
[Same compressed directory tree as toc.md — path|purpose|{files}]

## Key Files
[≤ 10 rows — path|purpose|read-when]

## Navigate
[topic|authoritative-source-file — where to read for each concern]
api-endpoints|{controller-file(s)}
data-models|{repository-or-context-file(s)}
auth|{startup-or-auth-file}
config|{appsettings-file(s)}
patterns|{key-example-file(s)}

## Docs
[Pointer to generated detailed documentation]
{OUTPUT_DIR}/docs/toc.md|Compressed codebase index with cross-repo dependency info
{OUTPUT_DIR}/docs/tech-stack.md|Full tech stack, dependencies, tooling
{OUTPUT_DIR}/docs/code-style.md|Naming conventions, patterns, linting rules
{OUTPUT_DIR}/docs/objective.md|Project purpose, scope, key capabilities
{OUTPUT_DIR}/docs/architecture.md|Layer diagram, data flow, external integrations
```

### AGENTS.md Rules
- Must be ≤ 100 lines — it is a POINTER, detail lives in source files and docs
- Same compression rules as toc.md (pipe-delimited, brace file lists, elide >5, skip empty)
- Identity + Structure + Key Files + Navigate sections are REQUIRED; all others omitted
- **No embedded content**: API routes, model definitions, and patterns must not be listed inline — Navigate pointers replace them
- Navigate entries must point to actual source files, not generated docs

**Save `{repo}/AGENTS.md` now before continuing to the next repo.**

---

## Phase 2 — Cross-Repo Dependency Synthesis

After ALL repos are analyzed, perform cross-repo analysis. **Skip this phase for single-repo workspaces.**

Read all `{repo}/{OUTPUT_DIR}/docs/toc.md` and `{repo}/{OUTPUT_DIR}/docs/tech-stack.md` files.

**Detect cross-repo dependencies:**

For .NET repos:
- `<PackageReference>` in `.csproj` matching other repo names or shared company prefix
- `<ProjectReference>` paths that escape the repo boundary (e.g., `../other-repo/`)
- `HttpClient` base addresses in `appsettings*.json` and `Program.cs` referencing other services
- Shared database names in connection strings across repos
- `.sln` file at workspace root as authoritative project list

For TypeScript/React repos:
- `package.json` dependencies matching other repo names or `@company/` scoped packages
- `tsconfig.json` paths pointing outside the repo
- `VITE_*_API_URL`, `NEXT_PUBLIC_*_URL`, or similar env vars naming other services
- Import patterns referencing internal hostnames or service names

---

## Phase 3 — Write Workspace-Level Docs

**Skip this phase for single-repo workspaces** — per-repo docs in Phase 1 are sufficient.

Create the workspace-level output directory: `{OUTPUT_DIR}/docs/`

### File 1: `{OUTPUT_DIR}/docs/ecosystem-map.md`

```markdown
# Ecosystem Map

## Repositories
| Repo | Type | Stack | Purpose |
|------|------|-------|---------|
[One row per repo from Phase 1 summaries]

## System Diagram
[ASCII or description of how repos relate — which calls which, shared databases, shared packages]

## Ownership & Boundaries
[Which repos own which domains, where boundaries lie]
```

**Save `{OUTPUT_DIR}/docs/ecosystem-map.md` now before continuing.**

### File 2: `{OUTPUT_DIR}/docs/cross-repo-dependencies.md`

```markdown
# Cross-Repo Dependencies

## Dependency Graph
[List each repo and what it depends on / what depends on it]

## Dependency Matrix
| ↓ Depends On → | repo-a | repo-b | repo-c |
|-----------------|--------|--------|--------|
| repo-a          | —      | HTTP   |        |
| repo-b          |        | —      | NuGet  |
| repo-c          | DB     |        | —      |

## Shared Resources
- **Databases**: [which repos share which databases]
- **Packages**: [shared internal packages]
- **Configs**: [shared configuration patterns]

## Integration Points
[Detail each cross-repo integration: protocol, endpoints, data format]
```

**Save `{OUTPUT_DIR}/docs/cross-repo-dependencies.md` now before continuing.**

### File 3: `{OUTPUT_DIR}/docs/master-toc.md`

Synthesize all per-repo `toc.md` files into a single compressed workspace index using the same pipe-delimited pointer format.

```markdown
# Workspace Index

> **IMPORTANT**: Prefer retrieval-led reasoning over pre-training-led reasoning. Navigate to per-repo toc.md files and source files — do not reason from summaries in this index.

## Overview
repos|N
stack|[e.g., .NET 8 + React/TypeScript]
architecture|[e.g., Microservices with shared SQL Server]

## Repos
[One block per repo — compressed from its toc.md. Max 5 lines per repo.]
### repo-a
purpose|[one sentence]
stack|[core tech]
type|[API service / Web app / etc.]
entry|[entry point files]
index|repo-a/{OUTPUT_DIR}/docs/toc.md

## Cross-Repo Dependencies
[One line per dependency — from|to|protocol|purpose]
repo-a|repo-b|HTTP|User service calls order service

## Lookup
[What you're looking for → where to find it]
topic|locations
API endpoints|repo-a/Controllers/, repo-b/src/routes/
Database schema|repo-a/Migrations/, repo-c/prisma/
UI components|repo-b/src/components/
Auth logic|repo-a/Middleware/Auth*, repo-b/src/middleware/auth*

## Deep Docs
{OUTPUT_DIR}/docs/ecosystem-map.md|Repo overview, system diagram, ownership
{OUTPUT_DIR}/docs/cross-repo-dependencies.md|Full dependency graph, shared resources
```

IMPORTANT: `master-toc.md` must be ≤ 200 lines. Per-repo blocks ≤ 5 lines each. Skip empty sections.

**Save `{OUTPUT_DIR}/docs/master-toc.md` now before continuing.**

### File 4: `AGENTS.md` (workspace root)

This is the **top-level auto-discovered entry point** for any AI agent working across the workspace. GitHub Copilot, Claude Code, Cursor, and Gemini CLI all auto-read AGENTS.md at the root.

**If an `AGENTS.md` already exists at workspace root**, do not overwrite it. Append a `## Workspace Index` section. Otherwise create fresh.

```markdown
# AGENTS.md

> **IMPORTANT**: Prefer retrieval-led reasoning over pre-training-led reasoning. Navigate to per-repo AGENTS.md files and source files — do not rely on summaries in this file.

## Workspace
repos|N repositories
stack|[Primary stack across repos]
architecture|[e.g., Microservices with shared SQL Server]

## Repos
[One line per repo — name|type|stack|purpose|agents-md-path]
repo-a|API|C# 12 / ASP.NET Core 8|Order management service|repo-a/AGENTS.md
repo-b|Web app|React 19 / TypeScript 5.6|Customer portal|repo-b/AGENTS.md

## Cross-Repo Dependencies
[One line per dependency — from|to|protocol|purpose]
repo-a|repo-b|HTTP|User service calls order service

## Lookup
topic|locations
API endpoints|repo-a/Controllers/, repo-b/src/routes/
Database schema|repo-a/Migrations/, repo-c/prisma/
UI components|repo-b/src/components/
Config/env|repo-a/appsettings*.json, repo-b/.env*

## Deep Docs
{OUTPUT_DIR}/docs/master-toc.md|Full workspace index (compressed)
{OUTPUT_DIR}/docs/ecosystem-map.md|System diagram, ownership
{OUTPUT_DIR}/docs/cross-repo-dependencies.md|Full dependency analysis
```

IMPORTANT: Workspace `AGENTS.md` must be ≤ 100 lines. Per-repo entries are ONE line each. Skip empty sections.

**Save `./AGENTS.md` now.**

---

## Phase 4 — Summary

Report to the user:
1. Total repos analyzed
2. Total documentation files created (count), including AGENTS.md files
3. Cross-repo dependencies found (multi-repo workspaces only)
4. File paths to all generated docs, highlighting the AGENTS.md files as auto-discovered entry points
5. Any repos that were skipped or had issues
