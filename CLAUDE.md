# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm test                   # Run all tests across Chromium, Firefox, WebKit
npm run test:chromium      # Run tests in Chromium only
npm run test:headed        # Run tests with visible browser window
npm run test:ui            # Interactive Playwright UI mode
npm run report             # Open last HTML test report
```

Run a single test file:
```bash
npx playwright test src/tests/cart.spec.ts
```

Run a single test by name:
```bash
npx playwright test -g "should add single item to cart"
```

Debug and inspect:
```bash
npx playwright test --debug           # Step through with Playwright Inspector
npx playwright show-trace <file.zip>  # Open trace viewer after a failed test
npx playwright codegen                # Record browser actions to generate test code
npx playwright install                # Install browser binaries (required after fresh clone)
```

## Architecture

### Page Object Model

All UI interactions are encapsulated in `src/page/`. Each class wraps locators and actions for one page.

- **`loginPage.ts`** — `goto()`, `login()`, `isLoggedIn()`, `getErrorMessage()`
- **`inventoryPage.ts`** — add/remove from cart, sort products, get prices/names, open cart
- **`cartPage.ts`** — verify items, get quantities/prices, remove items, navigate back

**Rules:**
- Tests NEVER contain raw locators or direct `page.locator()` calls — all selectors belong in page objects
- Page objects NEVER contain assertions — assertions belong in tests only

### Fixtures

`src/fixtures/test-fixtures.ts` extends `@playwright/test` with:
- `loginPage`, `inventoryPage`, `cartPage` — pre-instantiated page objects
- `loggedInInventoryPage` — pre-authenticated fixture; use this in cart/inventory tests instead of logging in manually
- `users` — centralized test credentials (standard, locked, problem, performance_glitch, invalid)

Import from fixtures, not directly from `@playwright/test`:
```ts
import { test, expect } from '../fixtures/test-fixtures';
```

### Test organization

Tests live in `src/tests/` split by feature: `login.spec.ts`, `inventory.spec.ts`, `cart.spec.ts`. Each file uses `test.describe()` blocks. Tests that require authentication use the `loggedInInventoryPage` fixture.

### Selector conventions

Locator priority (highest to lowest):
1. `getByRole()` — semantic, survives redesigns
2. `getByText()` / `getByLabel()`
3. `getByTestId()` / `data-test` attributes: `[data-test="username"]`
4. CSS class selectors — only when no better option exists

Use `.inventory_item` with `hasText` filter when targeting specific products by name. Avoid XPath and positional selectors.

### Assertions

Always use **web-first assertions** that have built-in auto-retry:
```ts
await expect(locator).toBeVisible()   // correct
expect(await locator.isVisible()).toBe(true)  // wrong — no auto-retry
```

Never use `page.waitForTimeout()` — it is a code smell. Use web-first assertions or `waitForSelector` only when necessary.

### Config

`playwright.config.ts` runs fully parallel by default. In CI (detected via `process.env.CI`): 2 retries, 1 worker. Traces are collected on first retry only. Test results go to `test-results/`, reports to `playwright-report/`.
