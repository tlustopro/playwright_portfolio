import { test, expect } from '../fixtures/test-fixtures';
import { LoginPage } from '../page/loginPage';
const { faker } = require('@faker-js/faker');

test.describe('Login', () => {
  test('should login with valid credentials', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.LOGIN_USERNAME!, process.env.LOGIN_PASSWORD!);
    try {
      expect(await loginPage.isLoggedIn()).toBeTruthy();
    } catch (error) {
      await page.screenshot({ path: `test-results/login-failure-${testInfo.project.name}.png`, fullPage: true });
      throw error;
    }
  });

  test('should not login with invalid password', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const randomPassword = faker.internet.password();
    await loginPage.login(process.env.LOGIN_USERNAME!, randomPassword);
    // Wait for possible error message or failed login state
    await page.waitForTimeout(2000);
    // Assert that the user icon does NOT show 'DA'
    const userIconText = await page.locator('[data-test="header-user-icon"]').innerText();
    expect(userIconText).not.toBe('DA');
    // Optionally, check for an error message
    // expect(await page.isVisible('text=Chybné přihlašovací údaje')).toBeTruthy();
  });
}); 