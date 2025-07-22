import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/loginPage';
import { USERS } from '../fixtures/test-fixtures';

test.describe('Sauce Demo Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login with standard user', async () => {
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    expect(await loginPage.isLoggedIn()).toBeTruthy();
  });

  test('should show error for locked out user', async () => {
    await loginPage.login(USERS.LOCKED.username, USERS.LOCKED.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Sorry, this user has been locked out');
  });

  test('should show error for invalid credentials', async () => {
    await loginPage.login('invalid_user', 'invalid_password');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });
}); 