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
- [ ] Subtask execution in TDD order
- [ ] Test verification (100% pass rate required)
- [ ] Task completion and status update

## Current Step: Task Discovery
```

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

### Step 3: Story & Task Analysis

Parse selected story structure and validate TDD approach within story using file-based progress tracking instead of todo_write.

### Step 4: Story Task Execution (TDD Workflow)

Execute story tasks in sequential order with file-based tracking:

#### Task 1: Write Tests (Test-First Approach)

**Actions:**
- Write comprehensive test cases for the entire feature
- Include unit tests, integration tests, and edge cases
- Cover happy path, error conditions, and boundary cases
- Ensure tests fail appropriately (red phase)

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

### Step 5: Story Completion & Status Updates

Update story file status and progress tracking files with completion details, ensuring all tests pass before marking complete.

## Tool Integration

**Primary tools:**
- `codebase` - Understanding existing architecture and patterns
- `search` - Finding related code and patterns
- `editFiles` - Implementing code changes
- `runCommands` - Executing build processes
- `runTests` - Running test suites
- `findTestFiles` - Locating test files
- `testFailure` - Analyzing test failures

**Progress tracking:**
- File-based progress tracking in `.code-captain/current-task-progress.md`
- Story status updates in specification files
- Test execution results documentation
