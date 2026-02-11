# Code Captain for GitHub Copilot + VS Code

> **Classic VS Code with AI-powered agents and prompts**

Transform GitHub Copilot Chat into a structured development workflow system with custom agents, prompts, and organized documentation.

## 🚀 Installation

### Automatic Installation (Recommended)

```bash
npx @devobsessed/code-captain
```

The installer will detect VS Code with Copilot and install to:
- `.github/agents/` - Code Captain agent
- `.github/prompts/` - Workflow prompt templates
- `.code-captain/` - Complete workflow system

### Manual Installation

```bash
# Clone or download the copilot/ directory contents to .github/
cp -r copilot/agents/ .github/agents/
cp -r copilot/prompts/ .github/prompts/
cp -r .code-captain/ .
```

## 🎯 Command Syntax

Code Captain integrates with Copilot Chat through a custom agent. After installation:

1. **Select Code Captain agent** from the agent picker
2. **Use slash commands** directly:

```bash
/initialize
/create-spec "user authentication system"
/execute-task
/status
```

## 📁 Agents & Prompts

### Agent
Located in `.github/agents/`:

- **Code Captain.agent.md** - Automatically available in agent picker

### Available Prompts
Located in `.github/prompts/`:

- **`create-spec.prompt.md`** - Feature specification creation
- **`create-adr.prompt.md`** - Architecture Decision Records
- **`execute-task.prompt.md`** - Test-driven development workflow
- **`initialize.prompt.md`** - Project setup and analysis
- **`plan-product.prompt.md`** - Product planning and strategy
- **`research.prompt.md`** - Systematic technical research
- **`explain-code.prompt.md`** - Code explanation with diagrams
- **`status.prompt.md`** - Project status analysis
- **`swab.prompt.md`** - Code cleanup methodology
- **`edit-spec.prompt.md`** - Specification modification
- **`new-command.prompt.md`** - Custom command creation

## 🛠️ Available Workflows

### 📋 Analysis & Research
- **Research Topics**: AI/ML frameworks, database patterns, security approaches
- **Market Analysis**: Competitive landscapes, feature comparisons
- **Technical Evaluation**: Library assessments, architecture reviews

### ⚙️ Implementation
- **TDD Workflow**: Test-first development with full coverage
- **Code Quality**: Automated reviews, style enforcement, best practices
- **Documentation**: Living docs, API specs, deployment guides

## Roadmap

### Phase 1: Enhanced Core Features ✅
1. **Advanced Analysis** - Multi-language support, framework detection
2. **Rich Specifications** - Visual diagrams, interaction flows, API schemas
3. **Smart Implementation** - Context-aware code generation, test automation

### Phase 2: Quality & Collaboration 🚧
1. **Code Quality** - Automated reviews, security analysis, performance optimization
2. **Team Coordination** - Specification sharing, progress tracking, knowledge management
3. **Documentation** - Auto-generated docs, interactive guides, video tutorials

### Phase 3: Advanced Features 📋
1. **AI Integration** - Smart suggestions, predictive analysis, automated refactoring
2. **Performance** - Benchmarking, optimization recommendations, monitoring integration
3. **Deployment** - CI/CD integration, environment management, rollback strategies

## 🔄 Workflow Examples

### Using the Agent

1. **Open Copilot Chat** in VS Code
2. **Select "Code Captain"** from the agent picker
3. **Type:** `/initialize`
4. **Follow the prompts** for project analysis
5. **Review generated files** in `.code-captain/docs/`

### Using Prompts Directly

1. **Open a prompt file** (e.g., `.github/prompts/create-spec.prompt.md`)
2. **Copy the prompt** content
3. **Paste in Copilot Chat** (any mode)
4. **Provide your feature description**

### Complete Feature Development

```bash
# Select "Code Captain" agent, then:

# 1. Project setup
/initialize

# 2. Research phase
/research "React state management options"

# 3. Document decision
/create-adr "React state management library selection"

# 4. Create specification
/create-spec "user dashboard with real-time notifications"

# 5. Implementation
/execute-task

# 6. Status check
/status
```

## 📁 File Organization

Copilot integration creates this structure:

```
.github/
├── agents/
│   └── Code Captain.agent.md
└── prompts/
    ├── create-spec.prompt.md
    ├── create-adr.prompt.md
    ├── execute-task.prompt.md
    ├── initialize.prompt.md
    ├── plan-product.prompt.md
    ├── research.prompt.md
    ├── explain-code.prompt.md
    ├── status.prompt.md
    ├── swab.prompt.md
    ├── edit-spec.prompt.md
    └── new-command.prompt.md

.code-captain/
├── docs/                  # Generated documentation
├── research/              # Technical research reports
├── decision-records/      # Architecture Decision Records
├── specs/                 # Feature specifications
└── cc.md                 # Complete reference guide
```

## 🎯 Copilot-Specific Features

### Custom Agents
- **Structured workflows** through agent activation
- **Context-aware responses** based on project state
- **Guided interactions** with step-by-step processes

### Prompt Templates
- **Reusable workflows** for consistent outputs
- **Copy-paste convenience** for complex processes
- **Customizable templates** for team standards

### Repository Integration
- **Repository-based configuration** through `.github/` structure
- **Team collaboration** through shared agents and prompts
- **Version-controlled workflows** alongside your codebase


## 📊 Command Reference

| Slash Command | Purpose | Output Location |
|---------------|---------|-----------------|
| `/initialize` | Project analysis | `.code-captain/docs/` |
| `/create-spec` | Feature specification | `.code-captain/specs/` |
| `/status` | Project status | Terminal output |
| `/research` | Technical research | `.code-captain/research/` |

## 🛠️ Troubleshooting

### Agent Not Available
**Problem**: Code Captain doesn't appear in agent picker
**Solution**: Ensure `.github/agents/Code Captain.agent.md` exists and restart VS Code

### Prompts Don't Work as Expected
**Problem**: Prompts generate inconsistent results
**Solution**: Copy the exact prompt text and include all context sections

### File Generation Issues
**Problem**: Files aren't created in expected locations
**Solution**: Check `.code-captain/` folder exists and has write permissions

## 🤝 Contributing

Copilot-specific contributions:

1. **Agent Enhancement** - Improve workflow integration
2. **Prompt Templates** - Add new workflow templates
3. **Documentation** - Add Copilot-specific examples
4. **Repository Integration** - Enhance repository templates

---

**Ready to enhance your Copilot workflow?**

1. **Install:** `npx @devobsessed/code-captain`
2. **Open:** Copilot Chat in VS Code
3. **Start:** Select "Code Captain" agent and type `/initialize`