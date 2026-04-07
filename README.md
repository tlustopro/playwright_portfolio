# QA Automation Portfolio With Playwright

This repository is a sample test automation project built with [Playwright](https://playwright.dev/) and TypeScript.

I use it as a QA engineering portfolio project to demonstrate how I structure both UI and API automation, organize reusable abstractions, cover core user flows, and run tests in CI.

The UI test target is [Sauce Demo](https://www.saucedemo.com), a common practice site for UI automation.
The API test target is [DummyJSON](https://dummyjson.com), a public REST API for testing and prototyping.

## What This Project Demonstrates

- Writing end-to-end UI tests with Playwright
- Writing API tests with Playwright's `APIRequestContext`
- Organizing UI automation with the Page Object Model
- Organizing API automation with the API Client Pattern
- Covering positive and negative scenarios for both UI and API
- Validating response shapes, types, and business logic in API tests
- Running tests across multiple browsers
- Executing the suite in CI with separate workflows for UI and API

## Project Approach

### 1. Page Object Model (UI)

UI tests use page object classes to keep selectors and reusable actions out of the test files.

- [loginPage.ts](src/page/loginPage.ts)
- [inventoryPage.ts](src/page/inventoryPage.ts)
- [cartPage.ts](src/page/cartPage.ts)

Test files stay focused on business flow, while page classes handle browser interaction details.

### 2. API Client Pattern (API)

API tests follow the same principle as POM — HTTP calls are encapsulated in dedicated client classes, mirroring the Page Object pattern for UI tests.

| UI | API |
|---|---|
| `src/page/loginPage.ts` | `src/api/authClient.ts` |
| `src/page/inventoryPage.ts` | `src/api/productsClient.ts` |
| `src/page/cartPage.ts` | `src/api/cartsClient.ts` |
| `src/fixtures/test-fixtures.ts` | `src/fixtures/api-fixtures.ts` |

The separation of concerns is the same:

- **API client** — defines *what the API can do*: `authClient.login()`, `productsClient.getAll()`. Pure HTTP abstraction, always returns the raw `APIResponse`.
- **Fixture** — defines *how to prepare the client for a test*: instantiates the client, handles setup like authentication, and injects it into tests via Playwright's fixture system.

This keeps assertions exclusively in tests, HTTP logic exclusively in clients, and setup exclusively in fixtures.

### 3. API Test Coverage

API tests cover three categories:

**Shape testing** — verifies the response contract (expected fields are present, arrays are arrays):
```ts
expect(body).toHaveProperty('accessToken');
expect(Array.isArray(body.products)).toBe(true);
```

**Type and value validation** — verifies fields have correct types and are within expected ranges:
```ts
expect(typeof product.price).toBe('number');
expect(product.rating).toBeLessThanOrEqual(5);
```

**Business logic validation** — verifies mathematical consistency of computed fields:
```ts
const summedQuantity = body.products.reduce((acc, p) => acc + p.quantity, 0);
expect(body.totalQuantity).toBe(summedQuantity);
```

### 4. UI Test Coverage

The UI suite focuses on the kinds of flows a QA engineer would typically prioritize first:

- login success and failure
- locked user behavior
- add and remove items from cart
- product sorting
- cart content verification

### 5. Cross-Browser Execution

UI tests run in Chromium, Firefox, and WebKit. API tests run without a browser — they only need a Node.js environment.

### 6. Continuous Integration

The repository includes two separate GitHub Actions workflows:

- **UI Tests** — runs browser tests in the official Playwright Docker image
- **API Tests** — runs without browsers, faster feedback, no browser dependencies

## Repository Structure

```text
playwright_portfolio/
├── .github/workflows/
│   ├── ui-tests.yml               # CI pipeline for UI tests (browser)
│   └── api-tests.yml              # CI pipeline for API tests (no browser)
├── src/
│   ├── api/
│   │   ├── authClient.ts          # HTTP client for /auth endpoints
│   │   ├── productsClient.ts      # HTTP client for /products endpoints
│   │   └── cartsClient.ts         # HTTP client for /carts endpoints
│   ├── fixtures/
│   │   ├── test-fixtures.ts       # Fixtures for UI tests
│   │   └── api-fixtures.ts        # Fixtures for API tests
│   ├── page/
│   │   ├── loginPage.ts           # Login page actions and selectors
│   │   ├── inventoryPage.ts       # Inventory page actions and selectors
│   │   └── cartPage.ts            # Cart page actions and selectors
│   ├── types/
│   │   └── api.types.ts           # TypeScript interfaces for API response shapes
│   └── tests/
│       ├── login.spec.ts          # Login UI scenarios
│       ├── inventory.spec.ts      # Inventory UI scenarios
│       ├── cart.spec.ts           # Cart UI scenarios
│       └── api/
│           ├── auth.api.spec.ts   # Auth API scenarios
│           ├── products.api.spec.ts # Products API scenarios
│           └── carts.api.spec.ts  # Carts API scenarios
├── playwright.config.ts           # Playwright configuration
├── package.json
└── README.md
```

## Test Scenarios Covered

### UI — Login

- successful login with a valid user
- error message for a locked-out user
- error message for invalid credentials

### UI — Product Collection

- add one item to cart
- add multiple items to cart
- sort products by name descending
- sort products by price low to high
- sort products by price high to low
- open the cart from inventory

### UI — Cart

- verify single-item cart contents
- verify multiple-item cart contents
- remove item from inventory page
- remove item from cart page

### API — Auth

- valid credentials return 200 with tokens and user profile
- invalid credentials return 400 with error message
- valid token returns current user profile

### API — Products

- paginated list returns correct envelope shape
- each product has required fields with correct types
- single product by ID returns correct data
- non-existent ID returns 404
- search returns matching products
- pagination skip returns different items

### API — Carts

- cart response has correct shape
- cart totals are arithmetically consistent
- POST creates cart with correct structure
- returned product fields match the request payload

## How To Run The Project

### Install dependencies

```bash
npm ci
```

### Install Playwright browsers (UI tests only)

```bash
npx playwright install
```

### Run all tests (UI + API)

```bash
npm test
```

### Run UI tests only

```bash
npm run test:chromium
```

### Run API tests only

```bash
npm run test:api
```

### Run one spec file

```bash
npx playwright test src/tests/login.spec.ts
```

### Open the HTML report

```bash
npm run report
```

## CI Workflows

### UI Tests (`ui-tests.yml`)

- runs on push and pull request to main/master
- uses the official Playwright Docker image with browser binaries
- runs Chromium, Firefox, and WebKit
- uploads HTML report as artifact

### API Tests (`api-tests.yml`)

- runs on push and pull request to main/master
- uses plain `ubuntu-latest` — no browser dependencies
- timeout 10 minutes vs 60 for UI
- uploads HTML report as artifact

## Test Strategy

- Login is treated as a critical entry-point flow — both successful and unsuccessful paths are covered.
- Product collection scenarios verify sorting and cart-entry actions.
- Cart scenarios verify state consistency including item presence, quantity, and price.
- API tests go beyond shape testing — business logic assertions verify that computed fields are mathematically consistent with their source data.
- Reusable fixtures keep setup centralized and reduce duplication.
- Cross-browser execution increases confidence across engines for UI flows.
- API tests run without browsers for faster, lighter feedback.
- The project is intentionally portfolio-focused — the emphasis is on maintainability, readability, and meaningful assertions rather than test volume.
