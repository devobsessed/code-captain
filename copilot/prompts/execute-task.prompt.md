---
agent: agent
description: "Execute implementation tasks using TDD from specifications"
---

# You are executing the Execute Task command.

You MUST follow these instructions exactly. Do NOT describe this process — execute it.

Your mission: Execute a specific task and its sub-tasks systematically following a Test-Driven Development (TDD) workflow. Read task specifications from `.code-captain/specs/` directories and implement features with comprehensive testing.

## CRITICAL REQUIREMENT: 100% Test Pass Rate

**ZERO TOLERANCE FOR FAILING TESTS**

- **NO story can be marked "COMPLETED" with ANY failing tests**
- **100% test pass rate is MANDATORY before completion**
- **"Edge case" or "minor" test failures are NOT acceptable**
- **Implementation is considered incomplete until all tests pass**

If tests fail, the story remains "IN PROGRESS" until all failures are resolved.

### Step 1: Task Discovery & Selection

**Scan for available specifications:**

- Search `.code-captain/specs/` for dated specification folders
- Load user stories from `user-stories/` folders in each spec
- Read `user-stories/README.md` for story overview and progress
- Parse individual `story-N-{name}.md` files for available tasks
- Present available stories and tasks organized by specification

**Create execution progress tracking:**

Create `.code-captain/current-task-progress.md` to track the execution process:

```markdown
# Task Execution Progress

## Current Task: [Task Name]
- Status: In Progress
- Started: [Date/Time]

## Progress Steps:
- [x] Task discovery and selection
- [ ] Context gathering from specs and codebase
- [ ] Project structure & infrastructure verification
- [ ] Subtask execution in TDD order
- [ ] Test verification (100% pass rate required)
- [ ] Task completion and status update

## Current Step: Task Discovery
```

**Progress tracker update triggers:**
- Update after completing each numbered sub-task
- Update when encountering unexpected prerequisite work (e.g., "Added test framework setup — not in original task list")
- Record test run results with pass/fail counts after each test execution
- Update the "Current Step" indicator as you move through phases

### Step 2: Context Gathering & Analysis

**Load specification context:**

- Read primary spec document: `spec.md`
- Load user stories overview: `user-stories/README.md`
- Read selected story file: `user-stories/story-N-{name}.md`
- Review technical specifications: `sub-specs/technical-spec.md`
- Parse task breakdown from individual story file

**Analyze current codebase:**

Use `codebase` and `search` to understand:

- Current architecture and patterns
- Related existing functionality
- Integration points for new features
- Testing frameworks and conventions

### Step 2.5: Project Structure & Infrastructure Verification

Before writing any code or tests, verify the project environment.

**Check existing project documentation:**

- If `.code-captain/docs/tech-stack.md` exists and contains project topology and test infrastructure status, use it rather than re-detecting from scratch
- Only perform fresh detection if `tech-stack.md` is missing or stale

**Detect project structure:**

1. Search for `*.sln` files at the repository root
2. If a solution file exists:
   - Identify project subdirectories (client, server, shared, etc.)
   - Determine which subdirectory contains the implementation target
   - Note the repo root path — all `.code-captain/` references are relative to root
3. If no solution file exists, treat the workspace root as the project root

**Verify test infrastructure:**

1. Check `package.json` (in the target directory) for a `test` script and test-related `devDependencies`
2. If NO test framework exists:
   - Select a test runner aligned with the project's build tool (e.g., Vitest for Vite, Jest for Webpack/CRA)
   - Install minimum required packages (test runner, DOM environment, assertion matchers)
   - Configure the test runner in the project's existing config file
   - Create a setup file if needed (e.g., for jest-dom matchers)
   - Add a `test` script to `package.json`
   - Run a trivial smoke test to confirm the framework works before writing real tests
3. If a test framework exists, verify it runs successfully with any existing tests
4. Document test infrastructure additions in the progress tracker

**Select test strategies (based on project stack):**

For JavaScript/TypeScript projects:
- **Component behavior tests**: Use the project's testing library (e.g., React Testing Library with `render`, `screen`, `fireEvent`) for rendered output and interactions
- **Static file content tests** (CSS variables, import assertions, file structure): Use Node.js `fs.readFileSync` to read source files as text — do NOT use `fetch()` which is unavailable or incomplete in test DOM environments (jsdom does not support `fetch` for `file://` URLs)
- **Integration tests**: Use the test runner's DOM environment for full component mounting

For .NET projects:
- Use the project's existing test framework (xUnit, NUnit, MSTest)
- Run tests with `dotnet test` (already non-interactive)

For other stacks:
- Align test strategy with the framework and conventions detected in `tech-stack.md` or discovered during infrastructure verification

### Step 3: Story & Task Analysis

Parse selected story structure and validate TDD approach within story using file-based progress tracking instead of todo_write.

### Step 4: Story Task Execution (TDD Workflow)

Execute story tasks in sequential order with file-based tracking:

#### Task 1: Write Tests (Test-First Approach)

**Actions:**
- Write comprehensive test cases for the entire feature
- Include unit tests, integration tests, and edge cases
- Cover happy path, error conditions, and boundary cases
- Use the appropriate test strategy from Step 2.5 (component tests vs static file tests vs integration tests)

**Red Phase Verification (mandatory before proceeding to green phase):**
1. Run the test suite after writing tests
2. Confirm tests produce **assertion failures** (e.g., "expected X but received Y") — not runtime errors or crashes
3. If tests error/crash instead of failing (e.g., `TypeError`, `fetch failed`, `Module not found`):
   - This means the test infrastructure or test approach is broken, not the feature code
   - Fix the test setup or rewrite the test approach
   - Re-run until tests fail cleanly with assertion messages
4. Only proceed to the green phase once all tests fail with clear assertion errors

#### Tasks 2-N: Implementation (Green Phase)

For each implementation task within the story:
1. **Focus on specific functionality**: Implement only what's needed for current task
2. **Make tests pass**: Write minimal code to satisfy failing tests
3. **Update related tests**: Modify adjacent tests if behavior changes
4. **Maintain compatibility**: Ensure no regressions in existing functionality
5. **Refactor when green**: Improve code quality while tests remain passing

#### Final Task: Test & Acceptance Verification

**CRITICAL: 100% Test Pass Rate Required**

**Mandatory Actions (ALL must succeed before story completion):**
1. **Run complete test suite for this story**
2. **Achieve 100% pass rate for ALL tests** - NO EXCEPTIONS
3. **Verify no regressions in existing test suites**
4. **Validate all acceptance criteria are met for the user story**
5. **Confirm story delivers the specified user value**

**STORY CANNOT BE MARKED COMPLETE WITH ANY FAILING TESTS**

### CRITICAL: One Story at a Time

**Execute ONLY the single selected story per invocation of this command.**

- After completing Step 4 (all tasks within the story) and verifying tests pass, proceed to Step 5.
- After Step 5, **STOP execution completely.**
- **DO NOT** automatically begin the next story.
- **DO NOT** ask "shall I continue with story 2?" and then start coding before the user responds.
- Present the completion summary and **wait for the user** to explicitly request the next story.
- The user must invoke `/execute-task` again or explicitly ask to continue with the next story.

### Step 5: Story Completion & Status Updates

Update story file status and progress tracking files with completion details, ensuring all tests pass before marking complete.

## Tool Integration

**Primary tools:**
- `codebase` - Understanding existing architecture and patterns
- `search` - Finding related code and patterns
- `editFiles` - Implementing code changes
- `runCommands` - Executing build processes (follow Terminal Command Standards from system instructions)
- `runTests` - Running test suites
- `findTestFiles` - Locating test files
- `testFailure` - Analyzing test failures

**Terminal discipline (see system instructions for full standards):**
- Always use non-interactive, single-run flags for test runners (e.g., `vitest run`, `jest --ci`)
- Never start dev servers or watch-mode processes — they block the chat session
- When running commands in subdirectories, use `cd <subdir> && <command>` to preserve cwd
- Verify `npm test` script contents before using it — scripts may invoke watch mode

**Progress tracking:**
- File-based progress tracking in `.code-captain/current-task-progress.md`
- Story status updates in specification files
- Test execution results documentation with pass/fail counts

## CRITICAL: Command Boundary — STOP After Story Completion

After completing a story and updating status files, present a summary in this format:

```
Story [N]: [Title] — COMPLETED

Results:
- Tests: [X] passed, [Y] failed
- Tasks completed: [N/N]
- Acceptance criteria: [all met / details]

Updated files:
- [list of modified/created files]

Next available story: Story [N+1]: [Title]
To continue, invoke /execute-task again or ask me to proceed with the next story.
```

**STOP here. Do NOT begin the next story automatically.**
