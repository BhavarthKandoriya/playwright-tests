# 🎭 Playwright Automation Framework (TypeScript)

A clean, modular, and scalable end-to-end automation testing framework built using **Playwright with TypeScript**. Designed to test modern web applications across multiple browsers with parallel execution, modular utilities, and built-in HTML reporting.

---

## 🚀 Key Features

- ✅ Built using **TypeScript** and **Playwright Test Runner**
- ✅ **Cross-browser support**: Chromium, Firefox, WebKit
- ✅ **Page Object Model (POM)** for reusable and maintainable test logic
- ✅ **Parallel test execution** out-of-the-box with Playwright
- ✅ **HTML Reporting** (built-in with Playwright)
- ✅ **Reusable utility modules** for:
  - Element interactions
  - Custom assertions
- ✅ Easy integration with CI tools like **GitHub Actions**, **Jenkins**, etc.

## 📁 Project Structure
    ├── pages                     # Folder containing separe page classes to interact with the locators
    ├── tests                     # Folder containing test scripts
    ├── pages                     # Folder containing separe page classes to interact with the locators
    ├── utilities                 # Scripts for reusable utilities for Playwright actions, assertions
    ├── README.md                 # Readme file
    └── playwright.config.ts      # Playwright configuration file to manage the execution timeouts, retry, reporting, etc. 

## Automated Test Scenarios

This project demonstrates an automated test scenario covering the following steps:

1. **Log In**: Authenticate using a username and password.
2. **Select Product**: Browse and select a product from the catalog.
3. **Add to Cart**: Add the selected product to the shopping cart.
4. **Place Order**: Fill out the form details and submit the order.
5. **Validate Success**: Verify that the order was placed successfully and the confirmation message is displayed.

## Project Components

This repository includes several key components to facilitate automation testing with Playwright:

- **Automated Test Scripts**: Comprehensive test scripts that automate the user journey described above.
- **Reusable Selectors and Functions**: Common selectors and UI action functions to promote code reusability and maintainability.
- **Utilities**: Helper functions and utilities for Playwright actions.
- **Configuration**: Playwright configuration files to manage timeouts, base URLs, and execution devices.

## Prerequisites

## 📦 Prerequisites

- Node.js v16+
- npm or yarn
- Git

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/BhavarthKandoriya/playwright-tests.git
cd playwright-tests
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install playwright browsers

```bash
npx playwright install
```

## Running Tests

```bash
npx playwright test
```

## Generate & View HTML Report
```
npx playwright show-report
```

## Execution Report

Upon executing the tests, you will receive a detailed report summarizing the test results. Below is an example of a report generated from the test execution:

![Execution Report](https://github.com/TechCipher13/web-automation-case-studies/blob/main/HTMLReport.png)
