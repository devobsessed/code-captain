# Initialize Command Workflow

## Command: `initialize`

### Purpose

Set up technical foundation and development infrastructure by detecting if this is a greenfield (new) or brownfield (existing) project and executing the appropriate technical setup workflow.

### Detection Logic

1. **Scan current directory** for indicators:

   - Presence of package.json, requirements.txt, Cargo.toml, go.mod, etc.
   - Existing source code directories (src/, lib/, app/, etc.)
   - Git repository status
   - Configuration files

2. **Classify as**:
   - **Greenfield**: Empty directory or minimal files
   - **Brownfield**: Existing codebase with established structure

---

## Greenfield Workflow

### Phase 1: Technical Foundation Setup

#### Greenfield Todo Checklist

Use `TodoWrite` to track progress through technical setup:

```json
{
  "todos": [
    {
      "id": "greenfield-tech-analysis",
      "content": "Determine technology stack and development requirements",
      "status": "in_progress"
    },
    {
      "id": "greenfield-tech-stack",
      "content": "Document technology stack in .code-captain/docs/tech-stack.md",
      "status": "pending"
    },
    {
      "id": "greenfield-structure",
      "content": "Create project directory structure and config files",
      "status": "pending"
    },
    {
      "id": "greenfield-dev-setup",
      "content": "Set up development configuration and tooling",
      "status": "pending"
    },
    {
      "id": "greenfield-readme",
      "content": "Generate technical README.md with setup instructions",
      "status": "pending"
    }
  ]
}
```

**Ask focused technical questions**:

1. **Project Type**: "What type of application are you building? (web app, API, mobile app, library, CLI tool, etc.)"
2. **Technical Constraints**: "Any required technologies, frameworks, or platforms?"
3. **Development Environment**: "What's your preferred development setup? (local, containerized, cloud-based)"
4. **Scale Requirements**: "Expected technical scale? (prototype, small team, enterprise)"

### Phase 2: Technology Recommendations

Based on technical requirements, recommend:

- **Tech Stack**: Languages, frameworks, databases suitable for the project type
- **Architecture Pattern**: Monolith, microservices, serverless based on scale needs
- **Development Tools**: Testing frameworks, build tools, linting/formatting
- **Project Structure**: Directory layout, naming conventions, configuration

### Phase 3: Technical Foundation Setup

#### Directory Structure (Pre-existing)

The `.code-captain/` directory structure already exists from installation:

- `.code-captain/docs/` - For technical documentation
- `.code-captain/research/` - For research outputs
- `.code-captain/commands/` - Pre-installed command definitions

#### Configuration Files

- **Package/dependency files** (package.json, requirements.txt, etc.)
- **Git configuration** (.gitignore, .gitattributes)
- **Development configuration** (prettier, eslint, testing config, etc.)
- **Build and deployment configuration** (if applicable)

#### Documentation Creation (Exact File Paths)

1. **`.code-captain/docs/tech-stack.md`** - Technology stack decisions and rationale
2. **`.code-captain/docs/code-style.md`** - Coding standards and development patterns
3. **`README.md`** - Technical overview and setup instructions

### Phase 4: Next Steps Guidance

After technical foundation is complete, provide clear next steps:

```
🚀 Technical Foundation Complete!

Your development environment is now set up and documented:
- Technology stack documented and configured
- Development tools and standards established  
- Project structure and configuration ready

## Recommended Next Steps:

### For New Products:
Use code-captain subagent: plan-product "your product idea" - Define product vision, strategy, and roadmap

### For Existing Products:
Use code-captain subagent: create-spec "feature description" - Create detailed feature specifications
Use code-captain subagent: execute-task - Implement features with TDD workflow

### For Research:
Use code-captain subagent: research "topic" - Conduct systematic technical research
Use code-captain subagent: create-adr "decision" - Document architectural decisions

Ready to define your product strategy and start building!
```

---

## Brownfield Workflow

### Phase 1: Codebase Analysis

#### Brownfield Todo Checklist

Use `TodoWrite` to track analysis progress:

```json
{
  "todos": [
    {
      "id": "brownfield-analysis",
      "content": "Analyze existing codebase structure, dependencies, and patterns",
      "status": "in_progress"
    },
    {
      "id": "brownfield-tech-stack",
      "content": "Document current tech stack in .code-captain/docs/tech-stack.md",
      "status": "pending"
    },
    {
      "id": "brownfield-code-style",
      "content": "Analyze and document code patterns in .code-captain/docs/code-style.md",
      "status": "pending"
    },
    {
      "id": "brownfield-architecture",
      "content": "Document system architecture and technical decisions",
      "status": "pending"
    }
  ]
}
```

**Scan and analyze**:

- **File structure** and organization patterns
- **Dependencies** and technology stack
- **Code patterns**, conventions, and architecture
- **Configuration files** and build processes
- **Testing setup** and development tools
- **Documentation gaps** and technical debt

### Phase 2: Documentation Generation

#### tech-stack.md

```markdown
# Technology Stack

## Languages

- [Primary language with version]
- [Secondary languages if any]

## Frameworks & Libraries

- [Main framework with version and purpose]
- [Key dependencies with purposes]

## Infrastructure

- [Database technology]
- [Deployment platform]
- [CI/CD tools]

## Development Tools

- [Package manager]
- [Testing framework]
- [Linting/formatting tools]

## Architecture Pattern

[Monolith/Microservices/Serverless/etc. with reasoning]
```

#### code-style.md

```markdown
# Code Style Guide

## File Organization

[Directory structure patterns observed]

## Naming Conventions

- [Variable naming patterns]
- [Function naming patterns]
- [File naming patterns]

## Code Patterns

[Common patterns observed in codebase]

## Testing Patterns

[How tests are structured and named]

## Documentation Style

[Comment and documentation patterns]
```

### Phase 3: Gap Analysis & Recommendations

Identify and document:

- **Missing technical documentation**
- **Inconsistent code patterns**
- **Technical debt and improvement opportunities**
- **Testing coverage gaps**
- **Development workflow improvements**
- **Architecture optimization opportunities**

### Phase 4: Next Steps Guidance

After brownfield analysis is complete, provide clear next steps:

```
🔍 Technical Foundation Analysis Complete!

Your existing project has been analyzed and documented:
- Current technology stack and architecture documented
- Code patterns and conventions identified
- Technical gaps and improvement opportunities noted

## Recommended Next Steps:

### For Product Strategy (Recommended First):
Use code-captain subagent: plan-product "enhanced product vision" - Define product strategy and roadmap

### For Feature Development:
Use code-captain subagent: create-spec "feature description" - Create detailed feature specifications
Use code-captain subagent: execute-task - Implement features following established patterns

### For Technical Improvements:
Use code-captain subagent: research "technical topic" - Research solutions for identified gaps
Use code-captain subagent: create-adr "technical decision" - Document architectural improvements

Ready to define your product strategy and enhance your codebase!
```

---

## CRITICAL: Final Message Requirements

**MANDATORY**: The initialize command MUST end with a message that prominently recommends `plan-product` as the next logical step for both greenfield and brownfield projects. This is required because:

1. Initialize handles ONLY technical foundation
2. plan-product handles product strategy and vision  
3. Users need both for complete project setup
4. plan-product should be the next step before feature development

**Required message format**:
```
🚀 Technical Foundation Complete! / 🔍 Technical Foundation Analysis Complete!

## Recommended Next Steps:

### For Product Strategy (Recommended First):
Use code-captain subagent: plan-product "your product idea/vision" - Define product strategy and roadmap

### For Feature Development:
Use code-captain subagent: create-spec "feature description" - Create detailed feature specifications
Use code-captain subagent: execute-task - Implement features

### For Technical Improvements:
Use code-captain subagent: research "topic" - Research solutions for gaps
Use code-captain subagent: create-adr "decision" - Document architectural decisions
```

---

## Claude Code Subagent Integration

### Delegation Patterns

The initialize command works within Claude Code's subagent system through:

**Automatic Invocation**:
- Claude Code automatically delegates project setup tasks to code-captain subagent
- Triggered by keywords: "initialize", "setup project", "analyze codebase"
- Proactive delegation for greenfield/brownfield detection

**Explicit Invocation**:
```bash
# Direct subagent invocation
> Use the code-captain subagent to initialize this project
> Have code-captain analyze this existing codebase
> Ask code-captain to set up technical foundation
```

### Subagent Workflow Integration

**Phase 1 - Detection**: 
- Use `Read` and `LS` tools to scan project structure
- Use `Grep` to identify technology indicators
- Use `Bash` for git status and dependency analysis
- **Initialize todos** with `TodoWrite` based on detected project type (greenfield/brownfield)

**Phase 2 - Analysis**:
- Use `Task` tool for complex brownfield analysis
- Delegate specialized analysis to focused subagents if available
- **Use `TodoWrite` immediately** to initialize phase todos and track structured progress

**Phase 3 - Documentation**:
- Use `Edit` tool for creating structured documentation
- Use `Write` tool for configuration file generation
- Use `WebSearch` for technology research and best practices
- **Update todos** with `TodoWrite` as each documentation file is completed

**Phase 4 - Integration**:
- Configure `.claude/settings.json` for project-specific permissions
- Set up MCP integrations for platform tools
- Establish hooks for automated workflows
- **Finalize todos** with `TodoWrite` marking all tasks as completed

### Context Preservation

Since subagents operate in separate contexts:
- **Document all decisions** in `.code-captain/docs/`
- **Maintain state** through structured file outputs
- **Provide clear handoffs** to subsequent commands
- **Reference project context** in all generated documentation

---

## Implementation Notes

### Tool Integration

#### Core Claude Code Tools

**File Operations (No Permission Required)**:
- Use `Read` for reading existing files and codebase scanning
- Use `LS` for listing directory contents and structure analysis
- Use `Glob` for finding files based on pattern matching
- Use `Grep` for searching patterns in file contents and code discovery

**File Modification (Permission Required)**:
- Use `Edit` for creating and modifying documentation files
- Use `Write` for creating new configuration files
- Use `MultiEdit` for atomic multi-file changes if needed

**System Operations (Permission Required)**:
- Use `Bash` for git status, package manager operations, and system commands
- Use `WebSearch` for technology research and documentation lookup

**Advanced Operations (No Permission Required)**:
- Use `Task` for delegating complex multi-step analysis workflows
- Use `TodoWrite` for structured progress tracking and task management

### Output Locations & File Structure

#### Directory Structure (Created by Install Script)

```
.code-captain/
├── commands/                 # CC command definitions (pre-installed)
└── docs/
    ├── best-practices.md     # Development best practices (pre-installed)
    ├── code-style.md         # Code conventions and patterns
    ├── tech-stack.md         # Technology decisions and rationale
    └── architecture.md       # System architecture (if complex)
```

#### Specific File Locations

**Docs Directory** (`.code-captain/docs/`):

- `best-practices.md` - Development best practices (pre-installed)
- `code-style.md` - Coding standards, naming conventions, patterns
- `tech-stack.md` - Technology choices with justifications
- `architecture.md` - System architecture and technical decisions (if complex)

**Research Directory** (`.code-captain/research/`):

- Research outputs, technical analysis, and investigation results

**Commands Directory** (`.code-captain/commands/`):

- Pre-installed CC command definitions (managed by system)

**Root Directory**:

- `README.md` - Project overview and quick start (only for new projects)

### Todo Integration

Each phase should update todos to show progress, enabling Claude Code's todo tracking:

#### Example Todo Updates

```javascript
// Mark analysis complete and start documentation phase
TodoWrite({
  merge: true,
  todos: [
    { id: "greenfield-tech-analysis", status: "completed" },
    { id: "greenfield-tech-stack", status: "in_progress" },
  ],
});

// Update when creating documentation files
TodoWrite({
  merge: true,
  todos: [
    { id: "greenfield-tech-stack", status: "completed" },
    { id: "greenfield-dev-setup", status: "completed" },
    { id: "greenfield-readme", status: "in_progress" },
  ],
});
```

#### Todo Best Practices

- **Always include file paths** in todo content for clarity
- **Use descriptive IDs** that indicate workflow type (greenfield/brownfield)
- **Update todos immediately** after completing each task
- **Mark todos as completed** only after files are actually created
- **Use `merge: true`** to update existing todos without replacing the entire list

#### File Creation Verification

Before marking documentation todos as complete, ensure:

1. **Directory exists**: `.code-captain/docs/`
2. **File is created**: Use `Edit` tool to create the actual file
3. **Content is complete**: File contains all required sections
4. **Path is correct**: Double-check exact file path matches todo description

#### Claude Code Integration

**Permission Configuration**:
```json
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(npm install)",
      "Bash(git diff)",
      "Edit(.code-captain/docs/*)",
      "Write(README.md)",
      "Write(.gitignore)"
    ]
  }
}
```

**MCP Integration**:
- Leverage GitHub MCP tools for repository analysis
- Use Supabase MCP tools for database schema documentation
- Configure additional MCP servers as needed for project-specific tools

**Hooks Configuration**:
```json
{
  "hooks": {
    "PostToolUse": {
      "Edit": "echo '✅ Documentation file updated'",
      "Write": "echo '✅ Configuration file created'"
    }
  }
}
```

### Quick Reference

**Key Claude Code Tools for Initialize**:
- `Read`, `LS`, `Glob`, `Grep` (No permissions) - Analysis and discovery
- `Edit`, `Write`, `MultiEdit` (Requires permissions) - File creation
- `Bash` (Requires permissions) - Git and package manager operations
- `WebSearch` (Requires permissions) - Technology research
- **`TodoWrite`** (No permissions) - **CRITICAL: Phase tracking and progress management**
- `Task` (No permissions) - Complex workflow delegation

**Required Permissions**:
```json
"allow": ["Bash(git:*)", "Bash(npm:*)", "Edit(.code-captain/docs/*)", "Write(README.md)", "Write(.gitignore)"]
```

**Essential Files Created**:
- `.code-captain/docs/tech-stack.md`
- `.code-captain/docs/code-style.md`
- `README.md` (greenfield only) 