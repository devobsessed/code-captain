---
agent: agent
description: "Conduct systematic research using structured phases"
---

# You are executing the Research command.

You MUST follow these instructions exactly. Do NOT describe this process — execute it.

Your mission: Conduct systematic research on the given topic using structured phases that build upon each other, creating actionable insights and leveraging web research capabilities.

### Phase 1: Define Research Scope

**Objective:** Establish clear research boundaries and questions

**Actions:**

1. Define primary research question(s)
2. Identify key stakeholders and their information needs
3. Set success criteria for the research
4. Plan research phases and approach

### Phase 2: Initial Discovery

**Objective:** Gather broad understanding of the topic landscape

**Actions:**

1. Use `fetch` with broad search terms related to your topic
2. Search for:
   - Overview articles and introductory content
   - Current trends and recent developments
   - Key players and thought leaders
   - Common terminology and concepts
3. Document initial findings and emerging themes
4. Identify knowledge gaps that need deeper investigation

**Search Strategy:**

- Start with general terms: "[topic] overview", "[topic] trends"
- Look for authoritative sources: documentation, whitepapers, industry reports
- Note recurring themes and terminology for Phase 3

### Phase 3: Deep Dive Analysis

**Objective:** Investigate specific aspects identified in Phase 2

**Actions:**

1. Use `fetch` with specific, targeted queries based on Phase 2 findings
2. Research specific sub-topics:
   - Technical implementation details
   - Pros and cons of different approaches
   - Real-world case studies and examples
   - Performance metrics and benchmarks
3. Compare alternatives and trade-offs
4. Validate claims from multiple sources

**Search Strategy:**

- Use specific terminology discovered in Phase 2
- Search for: "[specific approach] vs [alternative]", "[topic] case study", "[topic] performance"
- Look for criticism and limitations, not just benefits

### Phase 4: Synthesis and Recommendations

**Objective:** Transform research into actionable insights and document findings

**Actions:**

1. Synthesize findings into key insights
2. Create recommendations based on research
3. Identify next steps or areas requiring further investigation
4. Document sources and evidence for claims
5. Get current date using: `npx @devobsessed/code-captain date`
6. Create research document in `.code-captain/research/` folder
7. Present findings in appropriate format

**Deliverables:**

- Executive summary of key findings
- Pros/cons analysis of options
- Specific recommendations with rationale
- Risk assessment and mitigation strategies
- Further research needs
- **Research document:** `.code-captain/research/[DATE]-[topic-name]-research.md`

## Research Document Template

**First, get the current date using: `npx @devobsessed/code-captain date`**

Create a markdown file in `.code-captain/research/[DATE]-[topic-name]-research.md`.

Use the following structure:

```markdown
# [Topic Name] Research

**Date:** [Use date from determination process]
**Researcher:** [Name]
**Status:** [In Progress/Complete]

## Research Question(s)

[Primary questions this research aimed to answer]

## Executive Summary

[2-3 paragraph overview of key findings and recommendations]

## Background & Context

[Why this research was needed, current situation, stakeholders involved]

## Methodology

[How the research was conducted, sources used, timeframe]

## Key Findings

### Finding 1: [Title]

- **Evidence:** [Supporting data/sources]
- **Implications:** [What this means for the project/decision]

### Finding 2: [Title]

- **Evidence:** [Supporting data/sources]
- **Implications:** [What this means for the project/decision]

## Options Analysis

### Option 1: [Name]

- **Pros:** [Benefits and advantages]
- **Cons:** [Drawbacks and limitations]
- **Cost/Effort:** [Implementation requirements]
- **Risk Level:** [High/Medium/Low with explanation]

### Option 2: [Name]

- **Pros:** [Benefits and advantages]
- **Cons:** [Drawbacks and limitations]
- **Cost/Effort:** [Implementation requirements]
- **Risk Level:** [High/Medium/Low with explanation]

## Recommendations

### Primary Recommendation

[Specific recommended course of action with rationale]

### Alternative Approaches

[Secondary options if primary recommendation isn't feasible]

## Risks & Mitigation

- **Risk 1:** [Description] -> **Mitigation:** [How to address]
- **Risk 2:** [Description] -> **Mitigation:** [How to address]

## Further Research Needed

- [Question/area that needs additional investigation]

## Sources

- [Source 1 with URL and access date]
- [Source 2 with URL and access date]
```

## Tool Integration

**Primary tools:**

- `fetch` - Web research and external information gathering
- `search` - Finding existing research and related documentation
- `editFiles` - Creating research documents and reports
- `runCommands` - Date determination and directory operations
- `codebase` - Understanding project context and existing knowledge

**Documentation organization:**

- Research documents stored in `.code-captain/research/`
- Date-prefixed filenames for chronological organization
- Cross-references to related project documentation
