import { test as base } from '@playwright/test';
import { LoginPage } from '../page/loginPage';
import { InventoryPage } from '../page/homePage';
import { CartPage } from '../page/cartPage';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  }
});

export const USERS = {
  STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  LOCKED: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  },
  PROBLEM: {
    username: 'problem_user',
    password: 'secret_sauce'
  },
  PERFORMANCE_GLITCH: {
    username: 'performance_glitch_user',
    password: 'secret_sauce'
  }
};
