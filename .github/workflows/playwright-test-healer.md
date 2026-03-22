---
description: Automatically detect, diagnose, and fix failing Playwright tests by re-running failures, identifying root causes, and creating a PR with fixes.

on:
  schedule: daily on weekdays
  workflow_dispatch:

permissions:
  contents: read
  issues: read
  pull-requests: read
  actions: read

tools:
  bash: true
  edit:
  write: true
  github:
    toolsets: [repos, issues, pull_requests, actions]
  playwright:

steps:
  - name: Checkout code
    uses: actions/checkout@v4
    with:
      persist-credentials: false
      
  - name: Setup Node.js
    uses: actions/setup-node@v4
    with:
      node-version: '18'
      
  - name: Install dependencies
    run: npm ci
      
  - name: Install Playwright browsers
    run: npx playwright install --with-deps

network:
  allowed: [defaults, node, playwright, demoblaze.com]

safe-outputs:
  create-pull-request:
    title-prefix: "[fixed-tests]"
    labels: [enhancement, automated]
    protected-files: fallback-to-issue
  noop: {}
  add-comment:
    max: 3

---

# Playwright Test Healer

Automatically heal failing Playwright tests by diagnosing root causes and creating fixes.

## Your Task

1. **Fetch Failures** - Get the latest test run from the `playwright.yml` workflow
2. **Re-execute** - Run only the failed tests to confirm they still fail
3. **Diagnose** - Identify root causes (locator changes, DOM updates, timing issues, selector drift)
4. **Fix** - Apply targeted fixes to test files using Playwright's tools to inspect live selectors
5. **Raise PR** - Create a pull request with all fixes and a detailed summary

## Step 1: Fetch Latest Failures

Use the GitHub API to find the most recent workflow run of `playwright.yml`:

- Search for workflow runs with status `completed` or `failure`
- Extract failed test names and error messages from the run logs
- Note which test file(s) and specific test case(s) failed
- If no failures exist, report via noop that testing is healthy

## Step 2: Re-Execute Failed Tests

Run only the failed test cases to confirm they are reproducible:

```bash
npx playwright test --grep "@test-name-pattern" 2>&1
```

For each failed test:
- Capture the failure reason (timeout, assertion error, etc.)
- Note the exact error message and stack trace
- Check if it's a flaky test (sometimes passes, sometimes fails)

## Step 3: Diagnose Root Causes

Analyze the failure reasons and examine the test files:

1. **Read the failing test file** to understand what it's testing
2. **Check the application code** (pages/, utilities/) for recent changes
3. **Inspect selectors** - Use Playwright's `locator()` API to verify if selectors still match the DOM
4. **Common causes**:
   - Locator changed (element ID, class, or aria-label updated)
   - DOM structure shifted (nested divs added/removed)
   - Timing issues (element loads slower now, need longer timeout)
   - Text or content changed in assertions
   - Navigation path changed

## Step 4: Fix the Tests

For each failing test, apply targeted fixes:

1. **Locator fixes**: Update CSS selectors, text matchers, or role selectors to match current DOM
2. **Assertion fixes**: Update expected text or values if the UI changed
3. **Timing fixes**: Increase `timeout` or add `waitFor()` calls if elements load slowly
4. **Navigation fixes**: Update URLs or page object methods if routing changed

Always:
- Keep changes minimal and surgical
- Add comments explaining what was broken and why
- Maintain test readability and intent

## Step 5: Raise a Pull Request

When all fixes are complete:

1. Commit all changes to a new branch: `fix/playwright-test-healing-TIMESTAMP`
2. Create a pull request with:
   - **Title**: `fix: heal failing playwright tests [automated]`
   - **Description**:
     ```markdown
     ## 🔧 Test Healing Summary
     
     This PR automatically detects and fixes failing Playwright tests.
     
     ### Tests Fixed
     - List each fixed test and the issue
     
     ### Root Causes Identified
     - Locator changes (if applicable)
     - DOM structure updates (if applicable)
     - Timing issues (if applicable)
     - Other changes (if applicable)
     
     ### Changes Made
     - Specific fixes per test file
     
     ### Testing
     All fixed tests pass locally and are ready for review.
     ```
   - Apply labels: `automated`, `tests`, `bug-fix`
   - Request review from maintainers

Use the `create-pull-request` safe output to raise the PR.

## Success Criteria

- ✅ All previously failing tests now pass
- ✅ No new test failures introduced
- ✅ Root causes clearly documented in PR description
- ✅ Changes are minimal and focused on the failures
- ✅ Code maintains readability and test intent

## If No Fixes Needed

If the tests are all passing or if no failures are detected, call the `noop` safe output with a message confirming the test suite is healthy.
