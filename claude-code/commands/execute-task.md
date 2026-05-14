# Execute Task Command (execute-task)

## Overview

Execute a specific task and its sub-tasks systematically following a Test-Driven Development (TDD) workflow. This command reads task specifications from `.code-captain/specs/` directories and implements features with comprehensive testing, following established code standards and best practices.

## CRITICAL REQUIREMENT: 100% Test Pass Rate

**⚠️ ZERO TOLERANCE FOR FAILING TESTS ⚠️**

This command enforces strict test validation:
- **NO story can be marked "COMPLETED" with ANY failing tests**
- **100% test pass rate is MANDATORY before completion**
- **"Edge case" or "minor" test failures are NOT acceptable**
- **Implementation is considered incomplete until all tests pass**

If tests fail, the story remains "IN PROGRESS" until all failures are resolved.

## Command Process

### Step 1: Task Discovery & Selection

**Scan for available specifications:**

- Use `Glob` to search `.code-captain/specs/` for dated specification folders
- Use `Read` to load user stories from `user-stories/` folders in each spec
- Read `user-stories/README.md` for story overview and progress
- Parse individual `story-N-{name}.md` files for available tasks
- Present available stories and tasks organized by specification

**Create execution todo tracking:**

Use `TodoWrite` to track the execution process:

```json
{
  "todos": [
    {
      "id": "task-discovery",
      "content": "Discover and select task from available specifications",
      "status": "in_progress"
    },
    {
      "id": "context-gathering",
      "content": "Gather context from spec documents and codebase analysis",
      "status": "pending"
    },
    {
      "id": "subtask-execution",
      "content": "Execute all subtasks in TDD order",
      "status": "pending"
    },
    {
      "id": "test-verification",
      "content": "Verify all task-specific tests pass",
      "status": "pending"
    },
    {
      "id": "task-completion",
      "content": "Update task status and mark complete",
      "status": "pending"
    }
  ]
}
```

**Story selection process:**

1. **If multiple specs exist**: Present selection menu with spec dates and story summaries
2. **If single spec exists**: Show available stories and their tasks within that specification
3. **If story/task specified**: Validate story exists and select specific task for execution
4. **If no specs exist**: Guide user to run `/create-spec` first

**Selection format:**
```
Available specifications:
├── 2024-01-15-user-auth/ (3 stories, 12 total tasks)
│   ├── Story 1: User Registration (5 tasks) - Not Started
│   ├── Story 2: User Login (4 tasks) - Not Started
│   └── Story 3: Password Reset (3 tasks) - Not Started
└── 2024-01-20-payment-system/ (2 stories, 8 total tasks)
    ├── Story 1: Payment Processing (5 tasks) - In Progress (2/5)
    └── Story 2: Refund Management (3 tasks) - Not Started
```

### Step 2: Context Gathering & Analysis

**Load specification context:**

- Use `Read` to load primary spec document: `spec.md`
- Use `Read` to load user stories overview: `user-stories/README.md`
- Use `Read` to load selected story file: `user-stories/story-N-{name}.md`
- Use `Read` to review technical specifications: `sub-specs/technical-spec.md`
- Parse task breakdown from individual story file

**Analyze current codebase:**

Use `Grep` to understand:

- Current architecture and patterns
- Related existing functionality
- Integration points for new features
- Testing frameworks and conventions

**Load project standards:**

- Use `Read` to load code style guide: `.code-captain/docs/code-style.md`
- Use `Read` to load technology stack: `.code-captain/docs/tech-stack.md`
- Use `Read` to load best practices: `.code-captain/docs/best-practices.md`

### Step 3: Story & Task Analysis

**Parse selected story structure:**

- Load complete story file: `user-stories/story-N-{name}.md` using `Read`
- Extract user story, acceptance criteria, and implementation tasks
- Analyze task dependencies and execution order within the story
- Understand test requirements (first task typically writes tests)
- Plan implementation approach based on story's task breakdown

**Validate TDD approach within story:**

- **First task**: Should write tests for the story functionality
- **Middle tasks**: Implement functionality to pass tests (max 5-7 tasks total)
- **Final task**: Verify all tests pass and acceptance criteria are met
- **Integration considerations**: Update adjacent/related tests as needed

**Example story structure verification:**

```markdown
# Story 1: User Authentication

## User Story
**As a** new user
**I want to** register with email and password
**So that** I can access personalized features

## Acceptance Criteria
- [ ] User can register with valid email/password
- [ ] Email validation prevents invalid formats
- [ ] Password meets security requirements

## Implementation Tasks
- [ ] 1.1 Write tests for authentication middleware
- [ ] 1.2 Implement JWT token generation
- [ ] 1.3 Create password hashing utilities
- [ ] 1.4 Build login/logout endpoints
- [ ] 1.5 Verify all tests pass and acceptance criteria met
```

### Step 4: Pre-Implementation Preparation

**Create execution tracking:**

Update `TodoWrite` to reflect specific story tasks:

```json
{
  "todos": [
    {
      "id": "story-1-task-1",
      "content": "1.1 Write tests for authentication middleware (Story 1: User Authentication)",
      "status": "in_progress"
    },
    {
      "id": "story-1-task-2",
      "content": "1.2 Implement JWT token generation (Story 1: User Authentication)",
      "status": "pending"
    },
    {
      "id": "story-1-task-3",
      "content": "1.3 Create password hashing utilities (Story 1: User Authentication)",
      "status": "pending"
    },
    {
      "id": "story-1-task-4",
      "content": "1.4 Build login/logout endpoints (Story 1: User Authentication)",
      "status": "pending"
    },
    {
      "id": "story-1-task-5",
      "content": "1.5 Verify all tests pass and acceptance criteria met (Story 1: User Authentication)",
      "status": "pending"
    }
  ]
}
```

**Validate testing setup:**

- Use `Bash` to confirm testing framework is configured
- Use `Glob` to verify test directories and naming conventions
- Use `Grep` to check existing test patterns and utilities
- Use `Bash` to ensure test runner is functional

### Step 5: Story Task Execution (TDD Workflow)

**Execute story tasks in sequential order:**

#### Task 1: Write Tests (Test-First Approach)

**Actions:**

- Write comprehensive test cases for the entire feature using `Write` or `Edit`
- Include unit tests, integration tests, and edge cases
- Cover happy path, error conditions, and boundary cases
- Ensure tests fail appropriately (red phase)
- Run tests using `Bash` to confirm they fail as expected

**Test categories to include:**

- **Unit tests**: Individual function/method testing
- **Integration tests**: Component interaction testing
- **Edge cases**: Boundary conditions and error scenarios
- **Acceptance tests**: User story validation

#### Tasks 2-N: Implementation (Green Phase)

**For each implementation task within the story:**

1. **Focus on specific functionality**: Implement only what's needed for current task
2. **Make tests pass**: Write minimal code using `Edit` or `Write` to satisfy failing tests
3. **Update related tests**: Modify adjacent tests if behavior changes
4. **Maintain compatibility**: Ensure no regressions in existing functionality
5. **Run tests after each change**: Use `Bash` to verify tests pass
6. **Refactor when green**: Improve code quality while tests remain passing

**Implementation approach:**

- Start with simplest implementation that passes tests
- Add complexity incrementally as required by test cases
- Keep tests passing at each step
- Refactor for clarity and maintainability

#### Final Task: Test & Acceptance Verification

**CRITICAL: 100% Test Pass Rate Required**

**Mandatory Actions (ALL must succeed before story completion):**

1. **Run complete test suite for this story** using `Bash`
2. **Achieve 100% pass rate for ALL tests** - NO EXCEPTIONS
3. **Verify no regressions in existing test suites** using `Bash`
4. **Validate all acceptance criteria are met for the user story**
5. **Confirm story delivers the specified user value**

**⚠️ STORY CANNOT BE MARKED COMPLETE WITH ANY FAILING TESTS ⚠️**

If ANY tests fail:
- **STOP IMMEDIATELY** - Do not mark story as complete
- Debug and fix each failing test using `Edit`
- Re-run test suite using `Bash` until 100% pass rate achieved
- Only then proceed to mark story as complete

### Step 6: Story-Specific Test Validation

**Run targeted test validation:**

Use `Bash` to verify:

- All tests written in first task are passing
- New functionality works as specified in user story
- All acceptance criteria are satisfied
- No regressions introduced to existing features
- Performance requirements are met (if specified)

**Test execution strategy:**

- **First**: Run only tests for current story/feature using `Bash`
- **Then**: Run related test suites to check for regressions using `Bash`
- **Finally**: Consider full test suite if significant changes made
- **Acceptance**: Validate user story acceptance criteria are met

**Failure handling:**

**ZERO TOLERANCE FOR FAILING TESTS:**
- **If ANY tests fail**: Story CANNOT be marked complete
- **Required action**: Debug and fix ALL failing tests before proceeding
- **No exceptions**: "Edge case" or "minor" failing tests are NOT acceptable
- **If performance issues**: Optimize implementation until all tests pass
- **If regressions found**: Fix regressions - story completion is blocked until resolved

**Failure Resolution Process:**
1. Identify root cause of each failing test
2. Fix implementation to make test pass using `Edit`
3. Re-run ALL tests using `Bash` to ensure 100% pass rate
4. Repeat until NO tests fail
5. Only then mark story as complete

### CRITICAL: One Story at a Time

**Execute ONLY the single selected story per invocation of this command.**

- After completing Step 6 (test validation) and verifying tests pass, proceed to Step 7.
- After Step 7, **STOP execution completely.**
- **DO NOT** automatically begin the next story.
- **DO NOT** ask "shall I continue with story 2?" and then start coding before the user responds.
- Present the completion summary and **wait for the user** to explicitly request the next story.
- The user must invoke `/execute-task` again or explicitly ask to continue with the next story.

### Step 7: Story Completion & Status Updates

**Update story file status:**

Mark completed tasks in the individual story file (`user-stories/story-N-{name}.md`) using `Edit`:

```markdown
# Story 1: User Authentication

> **Status:** Completed ✅
> **Priority:** High
> **Dependencies:** None

## User Story
**As a** new user
**I want to** register with email and password
**So that** I can access personalized features

## Acceptance Criteria
- [x] User can register with valid email/password ✅
- [x] Email validation prevents invalid formats ✅
- [x] Password meets security requirements ✅

## Implementation Tasks
- [x] 1.1 Write tests for authentication middleware ✅
- [x] 1.2 Implement JWT token generation ✅
- [x] 1.3 Create password hashing utilities ✅
- [x] 1.4 Build login/logout endpoints ✅
- [x] 1.5 Verify all tests pass and acceptance criteria met ✅

## Definition of Done
- [x] All tasks completed ✅
- [x] All acceptance criteria met ✅
- [x] **ALL tests passing (100% pass rate)** ✅ **MANDATORY**
- [x] Code reviewed ✅
- [x] Documentation updated ✅

**NOTE:** Story CANNOT be marked complete without 100% test pass rate
```

**Update stories overview:**

Update progress tracking in `user-stories/README.md` using `Edit`:

```markdown
| Story | Title | Status | Tasks | Progress |
|-------|-------|--------|-------|----------|
| 1 | User Authentication | Completed ✅ | 5 | 5/5 ✅ |
| 2 | Password Reset | Not Started | 4 | 0/4 |
| 3 | Profile Management | Not Started | 6 | 0/6 |

**Total Progress:** 5/15 tasks (33%)
```

**Document completion:**

- Update spec status if all stories in the specification are complete
- Note any deviations from original plan in story notes
- Document lessons learned or improvements made
- Identify any follow-up tasks or technical debt

**Present completion summary:**

**ONLY present if ALL tests pass (100% pass rate):**

```
Story completed successfully:

**Story:** Story 1: User Authentication
**Tasks completed:** 5/5 ✅
**Acceptance criteria met:** 3/3 ✅
**Tests written:** 12 test cases
**Tests passing:** 12/12 (100%) ✅ REQUIRED FOR COMPLETION
**Files modified:** 6 files
**User value delivered:** New users can register with email/password and access personalized features

Current specification progress: 5/15 tasks (33%)

Next available stories:
- Story 2: Password Reset (4 tasks) - Not Started
- Story 3: Profile Management (6 tasks) - Not Started

To continue, invoke /execute-task again or ask me to proceed with the next story.
```

**STOP here. Do NOT begin the next story automatically.**

**If ANY tests fail, present this instead:**

```
Story implementation INCOMPLETE - Tests failing:

**Story:** Story 1: User Authentication
**Tasks completed:** 5/5 (implementation done, but validation failed)
**Tests written:** 12 test cases
**Tests passing:** 10/12 (83%) ❌ COMPLETION BLOCKED
**Failing tests:** 2 tests must be fixed before story completion
**Status:** IN PROGRESS - Cannot mark complete until 100% test pass rate

REQUIRED ACTIONS:
1. Debug and fix all failing tests
2. Re-run test suite to achieve 100% pass rate
3. Only then mark story as complete
```

## Tool Integration

**Primary tools:**

- `TodoWrite` - Progress tracking throughout execution
- `Grep` - Understanding existing architecture and patterns
- `Glob` - Locating relevant specifications and test files
- `Read` - Loading spec documents and existing code
- `Edit` / `Write` - Implementing code changes
- `Bash` - Executing tests and build processes

**Parallel execution opportunities:**

- Context gathering (multiple spec files, codebase analysis)
- Test file analysis (existing patterns, framework configuration)
- Implementation validation (running tests, checking integration)

## Integration with Code Captain Ecosystem

**Specification dependency:**

- Requires existing spec created by `/create-spec`
- Uses story breakdown from `user-stories/` folder in spec directories
- Loads individual story files: `user-stories/story-N-{name}.md`
- Tracks progress in `user-stories/README.md`
- Follows technical approach from `sub-specs/technical-spec.md`

**Code style compliance:**

- Adheres to patterns in `.code-captain/docs/code-style.md`
- Uses technology stack from `.code-captain/docs/tech-stack.md`
- Follows best practices from `.code-captain/docs/best-practices.md`

**Cross-command integration:**

- Complements `/create-spec` for complete development workflow
- Can invoke `/research` skill if unknown technologies encountered
- Integrates with testing and validation workflows

## Quality Standards

**Test-Driven Development:**

- Tests written before implementation
- **100% test pass rate MANDATORY before task completion**
- **ZERO TOLERANCE for failing tests - no story completion with any failures**
- Comprehensive coverage including edge cases
- Regression testing for existing functionality
- Failed tests = incomplete implementation that must be fixed

**Code quality requirements:**

- Follows established project patterns and conventions
- Maintains backward compatibility unless specified otherwise
- Implements proper error handling and validation
- Includes appropriate logging and monitoring

## Error Handling & Recovery

**Common failure scenarios:**

- **No specifications found**: Guide to `/create-spec`
- **Test framework issues**: Provide setup guidance via `Bash`
- **Implementation conflicts**: Suggest conflict resolution
- **Performance issues**: Recommend optimization approaches

**Blocking issue management:**

If blocked by technical issues:

```markdown
- [ ] N.X Task description ⚠️ Blocking issue: [DESCRIPTION]
```

Update story status and notes section to document the blocking issue.

**Resolution strategies:**

1. Try alternative implementation approach
2. Research solution using `/research` skill
3. Break down task into smaller components
4. Maximum 3 attempts before escalating or documenting as blocked
