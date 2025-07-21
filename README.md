# Playwright Portfolio

This repository demonstrates end-to-end (E2E) testing using [Playwright](https://playwright.dev/) for portfolio purposes. It showcases best practices in test automation, including the use of page objects, fixtures, and environment-based configuration.

## Approach

- **Page Object Model (POM):**  
  The test suite is organized using the Page Object Model, encapsulating page-specific actions and selectors in dedicated classes (`HomePage`, `LoginPage`). This improves maintainability and readability.

- **Custom Fixtures:**  
  Custom Playwright fixtures are used to enhance test reliability. For example, on test failure, screenshots are automatically captured and saved for debugging.

- **Environment Variables:**  
  Sensitive data such as login credentials are managed via environment variables and `.env` files, ensuring security and flexibility across environments.

- **Parallel and Cross-Browser Testing:**  
  The configuration runs tests in parallel and across major browsers (Chromium, Firefox, WebKit), ensuring broad coverage.

- **CI Integration:**  
  The repository includes a GitHub Actions workflow for automated testing on every push or pull request, with test reports uploaded as artifacts.

## Technologies Used

- **[Playwright](https://playwright.dev/):**  
  For browser automation and E2E testing.

- **TypeScript:**  
  For type-safe test and page object code.

- **[dotenv](https://github.com/motdotla/dotenv):**  
  For environment variable management.

- **[@faker-js/faker](https://fakerjs.dev/):**  
  For generating random test data.

- **GitHub Actions:**  
  For continuous integration and automated test execution.

## Pages Tested

- **Homepage:**
  - Verifies that the homepage loads successfully and key elements are visible.
- **Login Page:**
  - Tests successful login with valid credentials.
  - Tests login failure with invalid credentials and checks for appropriate error handling.

## Project Structure

```
playwright_portfolio/
├── src/
│   ├── fixtures/         # Custom Playwright fixtures
│   ├── page/             # Page object classes (HomePage, LoginPage)
│   └── tests/            # Test specifications (homepage, login)
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

2. **Set up environment variables:**  
   Create a `.env` file in the root directory:
   ```
   LOGIN_USERNAME=your_username
   LOGIN_PASSWORD=your_password
   ```

3. **Run tests:**
   ```bash
   npx playwright test
   ```

4. **View reports:**  
   After running tests, open the HTML report:
   ```bash
   npx playwright show-report
   ```

## Continuous Integration

- On every push or pull request to `main` or `master`, tests are run automatically in a containerized environment using GitHub Actions.
- Test reports are uploaded as artifacts for review.
