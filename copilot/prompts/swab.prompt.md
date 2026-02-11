---
agent: Code Captain
---

# Swab Command

## Overview

A deck-cleaning agent that makes one small, focused improvement to the codebase, following the "Boy Scout Rule" - leave the code cleaner than you found it. This command identifies the single best small cleanup opportunity and applies it with your approval.

## Command Process

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
🧽 Swabbing the deck... found some mess in {filename}

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
- Show success message: "✅ Deck swabbed! One less mess aboard."

**If declined:**
- Exit gracefully with: "🧽 Deck inspection complete. No changes made."

## Core Rules

1. **One change only** - Never fix multiple things at once
2. **Small changes** - Maximum 10 lines modified
3. **Safe changes** - If uncertain, do nothing
4. **Your approval required** - Always ask before applying
5. **Exact replacements** - Surgical precision, no formatting noise
6. **Conservative approach** - Better to find nothing than break something

## AI Implementation Prompt

```
You are a code reviewer cleaning up small messes on the ship.

MISSION: Find exactly ONE small, safe cleanup opportunity in the codebase.

RULES:
- Find ONE small cleanup only (1-10 lines max changed)
- Prioritize clarity and safety over cleverness
- Preserve all existing functionality exactly
- Be extremely conservative - if ANY uncertainty, do nothing
- Provide exact search/replace strings
- Focus on high-impact, zero-risk improvements

SCAN PRIORITIES:
1. Unclear variable names (single letters, abbreviations)
2. Magic numbers that should be named constants
3. Missing error handling (JSON.parse, fetch, etc.)
4. Dead/commented code removal
5. Minor formatting consistency

CODEBASE CONTEXT: {scanned_files_content}

RESPONSE FORMAT:
If you find a good cleanup opportunity:
{
  "cleanup": "Brief description of the improvement",
  "filename": "path/to/file.js",
  "searchText": "exact text to find (with proper whitespace)",
  "replaceText": "exact replacement text (with proper whitespace)",
  "reasoning": "Why this specific change helps readability/maintainability",
  "riskLevel": "Low|Medium",
  "linesChanged": number_of_lines_modified
}

If no clear, safe cleanup exists:
{
  "cleanup": null,
  "message": "No obvious cleanup opportunities found. Codebase looks tidy!"
}

CRITICAL: Only suggest changes you are 100% confident about. When in doubt, suggest nothing.
```

## Implementation Details

### Codebase Scanning Strategy

**File Discovery:**
- Use `codebase` to find code patterns and smells across all source files
- Use `search` to locate specific patterns and file types
- Focus on recently modified files first (higher likelihood of improvement opportunities)

**Content Analysis:**
- Read file contents for analysis
- Use `codebase` for pattern detection
- Focus on files under 500 lines for simplicity
- Prioritize recently modified files

### Change Application

**File Modification:**
```bash
# Use editFiles tool for exact string replacement
editFiles(
  file_path=target_file,
  old_string=exact_match_text,
  new_string=improved_text
)
```

**Verification:**
- Re-read file to confirm change applied correctly
- Run basic syntax validation if available
- Ensure no unintended modifications occurred

### Error Handling

**No opportunities found:**
```
🧽 Deck inspection complete. 

No obvious cleanup opportunities found in the scanned files.
Your codebase looks pretty tidy already! ✨

Run again later as the code evolves, or try focusing on a specific directory.
```

**Multiple opportunities found:**
- Always pick the highest-impact, lowest-risk option
- Never present multiple options (causes decision paralysis)
- Save other opportunities for future runs

**Change application failure:**
```
❌ Swab attempt failed. 

The suggested change couldn't be applied safely.
This might happen if the file was modified since scanning.
Try running the command again.
```

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

## Integration Notes

This command integrates with the existing Code Captain ecosystem by:

1. **Following established patterns** - Uses same structure as other commands
2. **Leveraging existing tools** - Uses GitHub Copilot's native capabilities
3. **Maintaining simplicity** - No complex configuration or state management
4. **Respecting user control** - Always asks permission before making changes
5. **Quality foundation** - Complements specification and implementation commands by maintaining code quality, supporting the overall project foundation alongside `.code-captain` documentation

## Future Enhancements

Potential future improvements (not in initial version):

- **Directory targeting**: `/swab src/components/`
- **File type filtering**: `/swab --js-only`
- **Batch mode**: `/swab --batch` (apply multiple small changes)
- **Learning**: Remember which types of cleanups user prefers
- **Metrics**: Track improvements made over time

But for now: Keep it simple. One command, one small improvement, user approval required.