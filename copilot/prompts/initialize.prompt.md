---
agent: agent
description: "Analyze and set up project foundation with documentation"
---

# You are executing the Initialize command.

You MUST follow these instructions exactly. Do NOT describe this process — execute it.

Your mission: Analyze the current project and set up the technical foundation. Detect whether this is a greenfield (new) or brownfield (existing) project, scan the codebase, and generate foundational documentation.

### Step 1: Project Type & Structure Detection

**Scan for existing code:**
- Check for common files indicating existing project (package.json, pom.xml, etc.)
- Detect programming languages and frameworks
- Identify project structure patterns
- Determine if greenfield (new) or brownfield (existing) project

**Detect project topology:**
- Search for `*.sln` files at the repository root (indicates .NET solution / monorepo)
- Search for multiple `package.json` files (indicates JavaScript/TypeScript monorepo)
- Check for workspace configurations (`pnpm-workspace.yaml`, `lerna.json`, `nx.json`)
- If a solution or monorepo is detected:
  - Map all sub-projects and their locations relative to the repo root
  - Identify which sub-projects are frontend, backend, shared libraries, etc.
  - Note each sub-project's independent tooling (build tool, test runner, package manager)
  - Document the topology in Step 3 (tech-stack.md)

### Step 2: Project Analysis

**For Brownfield Projects:**
- Scan codebase for technology stack inventory
- Analyze code patterns and conventions
- Infer project purpose and goals
- Generate comprehensive documentation

**Test infrastructure inventory (all project types):**
- For each sub-project (or the root project if not a monorepo):
  - Check `package.json` for `test` script and test-related `devDependencies`
  - Identify the test runner (Vitest, Jest, xUnit, NUnit, MSTest, pytest, etc.)
  - Note the test configuration file location (vite.config, jest.config, etc.)
  - Check if a test setup file exists (test-setup.js, setupTests.ts, etc.)
  - Record whether tests currently pass, fail, or if no test infrastructure exists
- Document findings in `tech-stack.md` so downstream commands (especially `execute-task`) have this context

**For Greenfield Projects:**
- Guide through strategic project setup questions
- Recommend technology stack based on requirements
- Create project foundation structure

### Step 3: Documentation Generation

Generate foundational documents in `.code-captain/docs/`:

- **tech-stack.md** - Complete technology inventory and analysis. Must include:
  - Project topology (single project, monorepo, or .NET solution with sub-projects)
  - For each sub-project: build tool, test runner (or "none"), test configuration location
  - Test infrastructure status: "ready" (tests exist and pass), "configured" (framework installed but no tests), or "missing" (no test framework)
- **code-style.md** - Observed patterns and coding conventions
- **objective.md** - Inferred or defined project purpose and goals
- **architecture.md** - System architecture overview and decisions

### Step 4: Next Steps Recommendation

Provide clear guidance on next steps, typically:
1. **`/plan-product`** - For product strategy and vision planning
2. **`/create-spec`** - For specific feature development
3. **`/research`** - For technology investigation needs

## Tool Integration

**Primary tools:**
- `codebase` - Analyzing codebase patterns and structure
- `search` - Finding specific patterns and technologies
- `editFiles` - Creating foundational documentation
- `runCommands` - Detecting build tools and dependencies
- `githubRepo` - Understanding repository context and history
- `findTestFiles` - Locating test files and patterns
- `problems` - Identifying code issues

**Terminal discipline:** Follow Terminal Command Standards from system instructions. When detecting build tools and dependencies, use non-blocking commands (e.g., check file existence rather than running full builds). In monorepos, use `cd <subdir> && <command>` to avoid cwd drift.

**Documentation organization:**
- Progress documented in `.code-captain/initialization-progress.md`
- Results organized in `.code-captain/docs/` folder

**Progress tracker updates:**
- Update `.code-captain/initialization-progress.md` after completing each step
- Record unexpected findings (e.g., "No test framework found in client project")
- Document project topology discoveries as they occur
