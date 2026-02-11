---
agent: agent
description: "Analyze and set up project foundation with documentation"
---

# You are executing the Initialize command.

You MUST follow these instructions exactly. Do NOT describe this process — execute it.

Your mission: Analyze the current project and set up the technical foundation. Detect whether this is a greenfield (new) or brownfield (existing) project, scan the codebase, and generate foundational documentation.

### Step 1: Project Type Detection

**Scan for existing code:**
- Check for common files indicating existing project (package.json, pom.xml, etc.)
- Detect programming languages and frameworks
- Identify project structure patterns
- Determine if greenfield (new) or brownfield (existing) project

### Step 2: Project Analysis

**For Brownfield Projects:**
- Scan codebase for technology stack inventory
- Analyze code patterns and conventions
- Infer project purpose and goals
- Generate comprehensive documentation

**For Greenfield Projects:**
- Guide through strategic project setup questions
- Recommend technology stack based on requirements
- Create project foundation structure

### Step 3: Documentation Generation

Generate foundational documents in `.code-captain/docs/`:

- **tech-stack.md** - Complete technology inventory and analysis
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

**Documentation organization:**
- Progress documented in `.code-captain/initialization-progress.md`
- Results organized in `.code-captain/docs/` folder
