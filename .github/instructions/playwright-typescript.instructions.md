---
applyTo: "**/*.spec.ts,**/*.test.ts,**/pages/**/*.ts,**/components/**/*.ts,**/fixtures/**/*.ts,**/utils/**/*.ts"
---

# Playwright TypeScript Automation Standards

## Framework

This project uses:

- Playwright with TypeScript
- Playwright Test Runner
- Page Object Model (POM)
- APIRequestContext for backend setup when appropriate
- Fixtures for dependency injection
- Strong TypeScript typing
- Parallel execution

Follow existing project patterns before introducing new implementations.

---

# Test Design

- Keep test files focused on business scenarios, not implementation details.
- Tests should read like user workflows.
- Every test should verify one business outcome.
- Prefer independent tests that can run in parallel.
- Avoid dependencies between tests.
- Avoid shared mutable state.
- Keep assertions inside test files whenever possible.
- Avoid assertions inside page objects unless the method exists solely to validate page state.

---

# Page Object Model

## Responsibilities

Page objects should:

- Encapsulate locators.
- Encapsulate UI interactions.
- Hide implementation details.
- Return meaningful business actions.

Good examples:

- login()
- searchVehicle()
- submitOffer()
- acceptTerms()

Avoid methods such as:

- clickButton()
- fillInput()
- pressEnter()

Methods should represent user intent rather than UI implementation.

---

## Locators

Prefer:

- getByRole()
- getByLabel()
- getByText()
- getByPlaceholder()
- getByTestId()

Avoid brittle selectors:

- XPath
- nth-child
- CSS based on styling
- Long chained selectors

Store locators as readonly properties whenever practical.

---

# Assertions

Prefer:

- expect(locator).toBeVisible()
- expect(locator).toHaveText()
- expect(locator).toContainText()
- expect(locator).toBeEnabled()
- expect(page).toHaveURL()

Avoid:

- Manual polling
- waitForTimeout()
- Boolean comparisons against locator state

Always use Playwright's built-in auto waiting.

---

# Waiting Strategy

Never use fixed waits.

Do not use:

```ts
waitForTimeout()
```

Instead rely on:

- expect()
- locator actions
- Playwright auto waiting
- waitForURL()
- waitForResponse() only when necessary
- waitForLoadState() only when appropriate

---

# Fixtures

Prefer fixtures over repeated setup.

Good candidates include:

- authenticated user
- page objects
- API clients
- seeded test data
- environment configuration

Avoid repeating setup logic inside every test.

---

# API Usage

Use APIRequestContext for:

- authentication
- test data creation
- cleanup
- backend validation

Do not perform slow UI flows when an API setup is available.

---

# TypeScript

Always:

- use strict typing
- avoid any
- use interfaces and types where appropriate
- prefer readonly properties
- use async/await
- keep methods small

Avoid unnecessary type assertions.

---

# Error Handling

Do not wrap Playwright actions in unnecessary try/catch blocks.

Allow Playwright to provide meaningful failures unless additional business context is required.

---

# Reusability

Extract reusable functionality into:

- page objects
- helper classes
- utility methods
- fixtures

Avoid duplicate logic.

Follow the DRY principle.

---

# Test Data

Generate unique test data whenever possible.

Avoid hardcoded:

- email addresses
- usernames
- IDs
- timestamps

Prefer helper utilities for data generation.

---

# Code Style

Prefer:

- descriptive variable names
- Use descriptive test and step titles that clearly state the intent. Add comments only to explain complex logic or non-obvious interactions.
- short methods
- single responsibility
- minimal comments
- Group related tests for a feature under a test.describe() block.

Code should be self-explanatory.

---

# File Organization
- **Location**: Store all test files in the `tests/` directory.
- **Naming**: Use the convention `<feature-or-page>.spec.ts` (e.g., `login.spec.ts`, `search.spec.ts`).
- **Scope**: Aim for one test file per major application feature or page.

---

# Performance

Keep UI interactions minimal.

Prefer API setup over UI setup.

Reuse authenticated sessions through fixtures.

Avoid unnecessary navigation.

Avoid repeated login flows.

---

# Accessibility

When creating locators, prefer accessible roles and labels.

Accessibility-friendly selectors are more stable than implementation-based selectors.

---

# Review Checklist

When reviewing Playwright code, verify:

- Page Object Model is respected.
- Tests describe business behavior.
- No duplicated locators exist.
- No duplicated business logic exists.
- No hard waits are introduced.
- Playwright auto waiting is leveraged.
- Fixtures are used instead of repeated setup.
- API setup is preferred where applicable.
- Assertions are meaningful.
- Locators are resilient.
- Methods have clear business intent.
- TypeScript types are correct.
- Tests are deterministic.
- Tests support parallel execution.
- Page objects contain interactions rather than assertions.
- Code follows existing project conventions before introducing new patterns.