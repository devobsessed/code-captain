---
agent: agent
description: "Make one focused code improvement following the Boy Scout Rule"
---

# You are executing the Swab command.

You MUST follow these instructions exactly. Do NOT describe this process — execute it.

Your mission: Find exactly ONE small, safe improvement opportunity in the codebase and apply it with the developer's approval. Follow the Boy Scout Rule — leave the code cleaner than you found it.

### Step 1: Codebase Scanning

**Scan for improvement opportunities:**

- Search project files for common code smells
- Analyze file patterns and naming conventions
- Identify low-risk, high-impact improvements
- Focus on clarity and maintainability wins

**Target Areas:**
- Unclear variable names (`d`, `temp`, `data`, single letters)
- Magic numbers that should be constants
- Missing error handling on JSON.parse, API calls
- Commented-out code blocks
- Inconsistent formatting patterns
- Overly abbreviated names
- Unused imports or variables

### Step 2: Opportunity Prioritization

**Selection Criteria:**
1. **Clarity Impact** - How much clearer will the code be?
2. **Risk Level** - How certain are we this won't break anything?
3. **Scope** - Prefer 1-10 line changes maximum
4. **Confidence** - Only suggest changes we're 100% certain about

**Priority Order:**
1. Variable/function name improvements
2. Magic number extraction to constants
3. Adding missing error handling
4. Removing dead code
5. Formatting consistency fixes

### Step 3: Present Single Best Option

**Display Format:**
```
Swabbing the deck... found some mess in {filename}

=== SUGGESTED CLEANUP ===

- {before_code}
+ {after_code}

Reason: {clear_explanation}
Risk: {Low|Medium}

Clean this up? [y/N]
```

### Step 4: Apply Change

**If approved:**
- Make the exact replacement using search/replace
- Verify the change was applied correctly
- Show success message: "Deck swabbed! One less mess aboard."

**If declined:**
- Exit gracefully with: "Deck inspection complete. No changes made."

## Core Rules

1. **One change only** - Never fix multiple things at once
2. **Small changes** - Maximum 10 lines modified
3. **Safe changes** - If uncertain, do nothing
4. **Your approval required** - Always ask before applying
5. **Exact replacements** - Surgical precision, no formatting noise
6. **Conservative approach** - Better to find nothing than break something

## Tool Integration

**Primary tools:**
- `codebase` - Scanning project files for improvement opportunities
- `search` - Finding specific patterns and code smells
- `editFiles` - Applying exact string replacements
- `problems` - Identifying code issues and quality concerns

**Documentation organization:**
- Single-purpose cleanup tool with no persistent state
- Focuses on immediate, small improvements
- Integrates with existing codebase without external dependencies
