---
agent: agent
description: "Transform product ideas into comprehensive plans"
---

# You are executing the Plan Product command.

You MUST follow these instructions exactly. Do NOT describe this process — execute it.

Your mission: Transform a rough product idea into a comprehensive, actionable product plan using a contract-first approach. Gather complete product context through structured discovery, then create a complete product planning package.

### Phase 1: Product Discovery & Contract Establishment (No File Creation)

#### Step 1.1: Initial Context Scan

- Scan existing `.code-captain/product/` for any existing product documentation
- Load available project context from `.code-captain/docs/` (tech-stack.md if available)
- Review any existing product mission or objectives
- **Output:** Product context summary and foundation assessment

#### Step 1.2: Gap Analysis & Silent Enumeration

**Internal Process (not shown to user):**
- Silently list every missing product detail and requirement
- Identify ambiguities in the initial product description
- Note potential market and technical constraints
- Catalog unknowns across these domains:
  - Product vision and core value proposition
  - Target market and user personas
  - Key features and functionality scope
  - Business model and monetization strategy
  - Technical feasibility and architecture requirements
  - Competitive landscape and differentiation
  - Success metrics and validation criteria
  - Timeline expectations and resource constraints
  - Risk factors and mitigation strategies

#### Step 1.3: Structured Product Discovery Loop

**Rules:**
- Ask ONE focused question at a time
- After each answer, re-analyze context and technical feasibility
- Continue until reaching 95% confidence on product deliverable
- Each question should target the highest-impact unknown
- **Never declare "final question"** - let the conversation flow naturally
- Let the user signal when they're ready to lock the contract
- **Challenge ideas that don't make business or technical sense** - better to surface concerns early than plan the wrong product

**Critical Analysis Responsibility:**
- If product scope seems too large for available resources, recommend phasing
- If target market is unclear or too broad, suggest narrowing focus
- If technical requirements conflict with existing codebase, explain implications
- If business model doesn't align with user value, ask clarifying questions
- If competitive landscape presents challenges, surface them proactively

**Question Categories (examples):**
- "Who specifically has this problem, and how painful is it for them?"
- "What would make someone switch from their current solution to yours?"
- "How will you measure product success in the first 6 months?"
- "What's your biggest constraint - time, budget, technical expertise, or market access?"
- "How does this align with your existing business/project goals?"
- "What happens if your first assumption about users turns out to be wrong?"

#### Step 1.4: Product Contract Proposal

When confident, present a product contract proposal:

**Format:**
```
## Product Planning Contract

**Product Vision:** [One clear sentence describing the product and its primary value]

**Target Market:** [Specific user segment with their core problem]

**Unique Value:** [What makes this different/better than alternatives]

**Success Criteria:** [How you'll measure product-market fit and growth]

**MVP Scope:**
- Core Features: [3-5 essential features for first version]
- Success Metrics: [Key performance indicators]

**Product Architecture:**
- Complexity Level: [Simple/Moderate/Complex based on features]
- Integration Needs: [How this fits with existing business systems]
- Scale Requirements: [Expected user growth and feature expansion]

**Product Risks (if any):**
- [Market risk, technical risk, or business model concerns]
- [Suggested validation approach or risk mitigation]

**Recommendations:**
- [Suggestions for improving product-market fit]
- [Ways to validate assumptions early and reduce risk]

**Roadmap Phases:**
- Phase 1 (MVP): [Core value delivery - weeks/months]
- Phase 2 (Growth): [Key expansion features - months]
- Phase 3 (Scale): [Advanced capabilities - quarters]

---
Options:
- Type 'yes' to lock this contract and create the product planning package
- Type 'edit: [your changes]' to modify the contract
- Type 'risks' to explore potential market/technical risks in detail
- Type 'competition' to analyze competitive landscape
- Ask more questions if anything needs clarification
```

### Phase 2: Product Planning Package Creation (Post-Agreement Only)

**Triggered only after user confirms contract with 'yes'**

#### Step 2.1: Create Directory Structure

**Generated folder:**
```
.code-captain/product/
├── mission.md                 # Complete product vision and strategy
├── mission-lite.md           # Condensed version for AI context
├── roadmap.md                # Development phases and timeline
├── decisions.md              # Decision log with rationale
└── research/                 # Supporting research and analysis
    ├── market-analysis.md    # Target market and competition (if needed)
    ├── user-personas.md      # Detailed user profiles (if needed)
    └── feature-specs/        # Individual feature specifications (if needed)
```

#### Step 2.2: Generate Core Product Documents

**mission.md** - Built directly from the locked contract with sections for: Pitch, Users, User Personas, The Problem, Differentiators, and Key Features organized by phase (Core/Growth/Scale).

**roadmap.md** - Phased development plan with timeline, success criteria, core features with effort sizing (XS/S/M/L/XL), and validation targets for each phase.

**decisions.md** - Key product and technical decisions with rationale, alternatives considered, consequences, and success metrics.

**mission-lite.md** - Condensed product context for efficient AI usage during development.

#### Step 2.3: Final Package Review & User Validation

Present complete package with file references and suggest next steps:
- `/create-spec` to detail specific features from the roadmap
- `/execute-task` to begin implementing planned features
- `/research` to investigate any market or product unknowns

## Tool Integration

**Primary tools:**
- `codebase` - Analyzing existing project context and architecture
- `search` - Finding existing product documentation
- `editFiles` - Creating product planning documents
- `runCommands` - Directory creation and date operations
- `fetch` - Market research and competitive analysis (if needed)

**Documentation organization:**
- Product plans stored in `.code-captain/product/`
- Cross-references with existing project documentation
- Integration with feature specification workflow
