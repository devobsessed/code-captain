---
name: swab
mode: agent
description: Find and apply one small, safe code cleanup improvement with user approval (Boy Scout Rule)
argument-hint: ""
---

# Swab

## Overview

A deck-cleaning skill that makes one small, focused improvement to the codebase, following the "Boy Scout Rule" — leave the code cleaner than you found it. Identifies the single best small cleanup opportunity and applies it with your approval.

## Process

### Step 0: Initialize Progress Tracking

Use `TodoWrite` to track the swab process:

```
- Scan codebase for improvement opportunities [in_progress]
- Prioritize and select best cleanup option [pending]
- Present cleanup suggestion to user [pending]
- Apply approved change [pending]
```

### Step 1: Codebase Scanning

**Scan for improvement opportunities:**

- Use `Grep` to search for common code smells across source files
- Use `Bash` to explore project structure and identify main source directories
- Use `Glob` to locate specific file types if needed
- Focus on recently modified files first

**Target Areas:**
- Unclear variable names (`d`, `temp`, `data`, single letters)
- Magic numbers that should be constants
- Missing error handling on JSON.parse, API calls
- Commented-out code blocks
- Inconsistent formatting patterns
- Overly abbreviated names
- Unused imports or variables

Update `TodoWrite`: mark "Scan codebase" as completed.

### Step 2: Opportunity Prioritization

Update `TodoWrite`: mark "Prioritize and select best cleanup option" as in_progress.

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

Use `Read` to load the target file and verify the exact text to replace.

Update `TodoWrite`: mark "Prioritize and select best cleanup option" as completed.

### Step 3: Present Single Best Option

Update `TodoWrite`: mark "Present cleanup suggestion to user" as in_progress.

**Display Format:**

```
🧽 Swabbing the deck... found some mess in {filename}

=== SUGGESTED CLEANUP ===

- {before_code}
+ {after_code}

Reason: {clear_explanation}
Risk: {Low|Medium}

Clean this up? [y/N]
```

**Important:** Present ONLY ONE option. Never show multiple options (causes decision paralysis). Save other opportunities for future runs.

Update `TodoWrite`: mark "Present cleanup suggestion to user" as completed.

### Step 4: Apply Change

Update `TodoWrite`: mark "Apply approved change" as in_progress.

**If approved:**
- Make the exact replacement using `Edit`
- Use `Read` to verify the change was applied correctly
- Mark "Apply approved change" as completed in `TodoWrite`
- Show success message: "✅ Deck swabbed! One less mess aboard."

**If declined:**
- Mark "Apply approved change" as completed (no change needed)
- Exit gracefully with: "🧽 Deck inspection complete. No changes made."

## Core Rules

1. **One change only** - Never fix multiple things at once
2. **Small changes** - Maximum 10 lines modified
3. **Safe changes** - If uncertain, do nothing
4. **Your approval required** - Always ask before applying
5. **Exact replacements** - Surgical precision, no formatting noise
6. **Conservative approach** - Better to find nothing than break something

## Codebase Scanning Strategy

**File Discovery:**
- Use `Grep` to find code patterns and smells across all source files
- Use `Bash` to explore project structure: `find . -name "*.js" -not -path "*/node_modules/*" | head -20`
- Use `Glob` to locate specific file types if needed
- Focus on files under 500 lines for simplicity

**Common Grep Patterns:**
```bash
# Single-letter variables
grep -rn " [a-z] = " src/ --include="*.{js,ts,py}"

# Magic numbers
grep -rn "[^a-zA-Z0-9_][0-9]\{3,\}[^0-9]" src/ --include="*.{js,ts,py}"

# Commented-out code
grep -rn "^[[:space:]]*//" src/ --include="*.{js,ts}" | head -10
```

## Error Handling

**No opportunities found:**

```
🧽 Deck inspection complete.

No obvious cleanup opportunities found in the scanned files.
Your codebase looks pretty tidy already! ✨

Run again later as the code evolves, or try focusing on a specific directory.
```

**Change application failure:**

```
❌ Swab attempt failed.

The suggested change couldn't be applied safely.
This might happen if the file was modified since scanning.
Try running the command again.
```

## Integration Notes

This skill integrates with the Code Captain ecosystem by:

1. **Following established patterns** - Uses same markdown structure as other commands
2. **Respecting user control** - Always asks permission before making changes
3. **Progress tracking** - Uses `TodoWrite` for visibility into skill progress
4. **Quality foundation** - Complements specification and implementation commands by maintaining code quality
