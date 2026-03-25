# QA Automation Portfolio With Playwright

This repository is a sample end-to-end test automation project built with [Playwright](https://playwright.dev/) and TypeScript.

I use it as a QA engineering portfolio project to demonstrate how I structure UI automation, organize reusable page objects, cover core user flows, and run tests in CI.

The test target is [Sauce Demo](https://www.saucedemo.com/v1/), a common practice site for UI automation.

## What This Project Demonstrates

- Writing end-to-end UI tests with Playwright
- Organizing automation with the Page Object Model
- Covering positive and negative login scenarios
- Validating cart and inventory behavior
- Running tests across multiple browsers
- Executing the suite in GitHub Actions

## Why Playwright

Playwright is a browser automation framework used for end-to-end testing.

In simple terms, it opens a real browser, performs actions such as clicking or typing, and verifies that the application behaves as expected.

This makes it a strong choice for QA engineers who want reliable UI automation with good debugging support, screenshots, traces, and cross-browser coverage.

## Project Approach

### 1. Page Object Model

This project uses page object classes to keep selectors and reusable actions out of the test files.

Examples:

- [loginPage.ts](/Users/denda/Desktop/playwright_portfolio/src/page/loginPage.ts)
- [inventoryPage.ts](/Users/denda/Desktop/playwright_portfolio/src/page/inventoryPage.ts)
- [cartPage.ts](/Users/denda/Desktop/playwright_portfolio/src/page/cartPage.ts)

That means the test files stay focused on business flow, while page classes handle browser interaction details.

### 2. Test Coverage Around Core User Flows

The suite focuses on the kinds of flows a QA engineer would typically prioritize first:

- login success
- login failure
- locked user behavior
- add item to cart
- remove item from cart
- cart content verification

### 3. Cross-Browser Execution

The Playwright configuration is set up to run tests in:

- Chromium
- Firefox
- WebKit

This helps demonstrate awareness that UI behavior should be checked beyond a single browser engine.

### 4. Continuous Integration

The repository includes a GitHub Actions workflow that runs the suite on push and pull request events.

That shows the project is not only runnable locally, but also ready for automated feedback in a team workflow.

## Repository Structure

```text
playwright_portfolio/
├── .github/workflows/playwright.yml   # CI pipeline for Playwright
├── src/
│   ├── fixtures/test-fixtures.ts      # Shared test data and fixture setup
│   ├── page/
│   │   ├── loginPage.ts               # Login page actions and selectors
│   │   ├── inventoryPage.ts           # Inventory page actions and selectors
│   │   └── cartPage.ts                # Cart page actions and selectors
│   └── tests/
│       ├── login.spec.ts              # Login scenarios
│       ├── inventory.spec.ts          # Inventory and cart entry scenarios
│       └── cart.spec.ts               # Cart validation scenarios
├── playwright.config.ts               # Playwright test runner configuration
├── package.json
└── README.md
```

## Test Scenarios Covered

### Login

- successful login with a valid user
- error message for a locked-out user
- error message for invalid credentials

### Inventory

- add one item to cart
- add multiple items to cart
- open the cart from inventory
- trigger product sorting

### Cart

- verify single-item cart contents
- verify multiple-item cart contents
- remove item from inventory page
- remove item from cart page

## Test Data

The suite uses Sauce Demo's predefined users for stable, repeatable scenarios.

Current examples in the project:

- `standard_user`
- `locked_out_user`
- `problem_user`
- `performance_glitch_user`

## How To Run The Project

### 1. Install dependencies

```bash
npm ci
```

### 2. Install Playwright browsers

```bash
npx playwright install
```

Playwright needs browser binaries so it can launch Chromium, Firefox, and WebKit during test execution.

### 3. Run all tests

```bash
npm test
```

### 4. Run one spec file

```bash
npx playwright test src/tests/login.spec.ts
```

### 5. Open the HTML report

```bash
npm run report
```

The HTML report is useful when reviewing failures because it shows which tests passed, which failed, and often includes traces or debugging details.

## CI Workflow

The GitHub Actions workflow:

- checks out the repository
- installs dependencies
- runs the Playwright suite
- uploads the Playwright HTML report as an artifact

Useful local commands:

- `npm test`
- `npm run test:chromium`
- `npm run test:headed`
- `npm run test:ui`
- `npm run report`

File:

- [playwright.yml](/Users/denda/Desktop/playwright_portfolio/.github/workflows/playwright.yml)

## Notes

- This repository is intentionally small and portfolio-focused.
- The current goal is clarity, maintainability, and readable automation structure.
- Future improvements may include stronger fixture usage, richer assertions, and expanded reporting.
