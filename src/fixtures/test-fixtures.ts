import { expect, test as base } from '@playwright/test';
import { LoginPage } from '../page/loginPage';
import { InventoryPage } from '../page/inventoryPage';
import { CartPage } from '../page/cartPage';

type UserCredentials = {
  username: string;
  password: string;
};

type TestUsers = {
  STANDARD: UserCredentials;
  LOCKED: UserCredentials;
  PROBLEM: UserCredentials;
  PERFORMANCE_GLITCH: UserCredentials;
  INVALID_CREDENTIALS: UserCredentials;
};

type TestFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  users: TestUsers;
  loggedInInventoryPage: InventoryPage;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  users: async ({}, use) => {
    await use(USERS);
  },
  loggedInInventoryPage: async ({ loginPage, inventoryPage, users }, use) => {
    await loginPage.goto();
    await loginPage.login(users.STANDARD.username, users.STANDARD.password);
    await loginPage.isLoggedIn();
    await inventoryPage.isLoaded();
    await use(inventoryPage);
  },
});

export { expect };

export const USERS: TestUsers = {
  STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  LOCKED: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  PROBLEM: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  PERFORMANCE_GLITCH: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  INVALID_CREDENTIALS: {
    username: 'invalid_user',
    password: 'invalid_password',
  },
};
