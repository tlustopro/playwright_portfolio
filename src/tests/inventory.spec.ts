import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/loginPage';
import { InventoryPage } from '../page/homePage';
import { USERS } from '../fixtures/test-fixtures';

test.describe('Sauce Demo Inventory', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    
    // Login before each test
    await loginPage.goto();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await loginPage.isLoggedIn();
  });

  test('should add item to cart', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    expect(await inventoryPage.getCartCount()).toBe('1');
  });

  test('should add multiple items to cart', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.addToCart('Sauce Labs Bike Light');
    expect(await inventoryPage.getCartCount()).toBe('2');
  });

  test('should sort products', async () => {
    await inventoryPage.sortProducts('za');
    // Add assertions for sorting if needed
  });

  test('should open cart', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    // Add assertions for cart page if needed
  });
}); 