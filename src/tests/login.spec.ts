import { expect, test } from '../fixtures/test-fixtures';

test.describe('Sauce Demo Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should login with standard user', async ({ loginPage, users }) => {
    await loginPage.login(users.STANDARD.username, users.STANDARD.password);
    await loginPage.isLoggedIn();
  });

  test('should show error for locked out user', async ({ loginPage, users }) => {
    await loginPage.login(users.LOCKED.username, users.LOCKED.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Sorry, this user has been locked out');
  });

  test('should show error for invalid credentials', async ({ loginPage, users }) => {
    await loginPage.login(users.INVALID_CREDENTIALS.username, users.INVALID_CREDENTIALS.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });
}); 
