# Playwright Portfolio

This repository demonstrates end-to-end (E2E) testing using [Playwright](https://playwright.dev/) for portfolio purposes. It showcases best practices in test automation, including the use of page objects, fixtures, and comprehensive test coverage using the [Sauce Demo](https://www.saucedemo.com/v1/) website as a test target.

## Approach

- **Page Object Model (POM):**  
  The test suite is organized using the Page Object Model, encapsulating page-specific actions and selectors in dedicated classes (`InventoryPage`, `LoginPage`, `CartPage`). This improves maintainability and readability.

- **Custom Fixtures:**  
  Custom Playwright fixtures are used to enhance test reliability and provide easy access to page objects and test data like predefined user credentials.

- **Predefined Test Users:**  
  The test suite uses Sauce Demo's predefined test users (standard_user, locked_out_user, etc.) to demonstrate different test scenarios and edge cases.

- **Parallel and Cross-Browser Testing:**  
  The configuration runs tests in parallel and across major browsers (Chromium, Firefox, WebKit), ensuring broad coverage.

- **CI Integration:**  
  The repository includes a GitHub Actions workflow for automated testing on every push or pull request, with test reports uploaded as artifacts.

## Technologies Used

- **[Playwright](https://playwright.dev/):**  
  For browser automation and E2E testing.

- **TypeScript:**  
  For type-safe test and page object code.

- **GitHub Actions:**  
  For continuous integration and automated test execution.

## Features Tested

- **Login:**
  - Successful login with standard user
  - Locked out user handling
  - Invalid credentials error handling

- **Inventory Page:**
  - Product listing and details
  - Add to cart functionality
  - Remove from cart functionality
  - Sort products functionality

- **Shopping Cart:**
  - Add single/multiple items
  - Remove items
  - Cart badge count updates
  - Price verification
  - Cart contents validation

## Project Structure

```
playwright_portfolio/
├── src/
│   ├── fixtures/         # Custom Playwright fixtures and test users
│   ├── page/            
│   │   ├── loginPage.ts      # Login page actions
│   │   ├── inventoryPage.ts  # Inventory/product listing actions
│   │   └── cartPage.ts       # Shopping cart actions
│   └── tests/           
│       ├── login.spec.ts     # Login tests
│       ├── inventory.spec.ts # Inventory tests
│       └── cart.spec.ts      # Shopping cart tests
├── playwright.config.ts  # Playwright configuration
├── .github/workflows/    # CI workflow for Playwright tests
├── README.md
└── package.json
```

## Running the Tests

1. **Install dependencies:**
   ```bash
   npm ci
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

3. **Run all tests:**
   ```bash
   npx playwright test
   ```

4. **Run specific test file:**
   ```bash
   npx playwright test login.spec.ts
   npx playwright test cart.spec.ts
   ```

5. **View reports:**  
   After running tests, open the HTML report:
   ```bash
   npx playwright show-report
   ```

## Test Users

The following test users are available for different scenarios:

- **standard_user:** Regular user with full access
- **locked_out_user:** User that cannot log in
- **problem_user:** User that encounters various UI glitches
- **performance_glitch_user:** User that experiences slow performance

## Continuous Integration

- On every push or pull request to `main` or `master`, tests are run automatically in a containerized environment using GitHub Actions.
- Test reports are uploaded as artifacts for review.
