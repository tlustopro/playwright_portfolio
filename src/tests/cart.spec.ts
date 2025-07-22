import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/loginPage';
import { InventoryPage } from '../page/homePage';
import { CartPage } from '../page/cartPage';
import { USERS } from '../fixtures/test-fixtures';

test.describe('Shopping Cart Functionality', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    
    // Login and verify we're on the inventory page
    await loginPage.goto();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await loginPage.isLoggedIn();
  });

  test('should add single item to cart and verify cart contents', async () => {
    const itemName = 'Sauce Labs Backpack';
    
    // Get initial cart count
    expect(await inventoryPage.getCartCount()).toBe('0');
    
    // Add item to cart
    await inventoryPage.addToCart(itemName);
    
    // Verify cart badge updated
    expect(await inventoryPage.getCartCount()).toBe('1');
    
    // Verify "REMOVE" button is visible
    expect(await inventoryPage.isRemoveButtonVisible(itemName)).toBeTruthy();
    
    // Get item price from inventory
    const inventoryPrice = await inventoryPage.getProductPrice(itemName);
    
    // Open cart and verify item
    await inventoryPage.openCart();
    await cartPage.isLoaded();
    
    // Verify item presence and details in cart
    expect(await cartPage.isItemInCart(itemName)).toBeTruthy();
    expect(await cartPage.getItemQuantity(itemName)).toBe('1');
    expect(await cartPage.getItemPrice(itemName)).toBe(inventoryPrice);
  });

  test('should add multiple items to cart and verify cart contents', async () => {
    const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
    
    // Add items to cart
    for (const itemName of items) {
      await inventoryPage.addToCart(itemName);
    }
    
    // Verify cart badge shows correct count
    expect(await inventoryPage.getCartCount()).toBe(items.length.toString());
    
    // Open cart
    await inventoryPage.openCart();
    await cartPage.isLoaded();
    
    // Verify each item in cart
    for (const itemName of items) {
      expect(await cartPage.isItemInCart(itemName)).toBeTruthy();
      expect(await cartPage.getItemQuantity(itemName)).toBe('1');
    }
  });

  test('should remove item from cart and verify cart update', async () => {
    const itemName = 'Sauce Labs Backpack';
    
    // Add item to cart
    await inventoryPage.addToCart(itemName);
    expect(await inventoryPage.getCartCount()).toBe('1');
    
    // Remove item using inventory page
    await inventoryPage.removeFromCart(itemName);
    
    // Verify cart badge updated
    expect(await inventoryPage.getCartCount()).toBe('0');
    
    // Verify "ADD TO CART" button is visible again
    expect(await inventoryPage.isAddToCartButtonVisible(itemName)).toBeTruthy();
  });

  test('should remove item from cart page and verify cart update', async () => {
    const itemName = 'Sauce Labs Backpack';
    
    // Add item and go to cart
    await inventoryPage.addToCart(itemName);
    await inventoryPage.openCart();
    
    // Remove item from cart page
    await cartPage.removeItem(itemName);
    
    // Verify item is no longer in cart
    expect(await cartPage.isItemInCart(itemName)).toBeFalsy();
    
    // Return to inventory and verify "ADD TO CART" button is visible
    await cartPage.continueShopping();
    expect(await inventoryPage.isAddToCartButtonVisible(itemName)).toBeTruthy();
  });
}); 