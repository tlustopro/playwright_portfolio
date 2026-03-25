import { expect, test } from '../fixtures/test-fixtures';

test.describe('Sauce Demo Inventory', () => {
  test('should add item to cart', async ({ loggedInInventoryPage }) => {
    await loggedInInventoryPage.addToCart('Sauce Labs Backpack');
    expect(await loggedInInventoryPage.getCartCount()).toBe('1');
  });

  test('should add multiple items to cart', async ({ loggedInInventoryPage }) => {
    await loggedInInventoryPage.addToCart('Sauce Labs Backpack');
    await loggedInInventoryPage.addToCart('Sauce Labs Bike Light');
    expect(await loggedInInventoryPage.getCartCount()).toBe('2');
  });

  test('should sort products', async ({ loggedInInventoryPage }) => {
    const namesBeforeSort = await loggedInInventoryPage.getProductNames();
    await loggedInInventoryPage.sortProducts('za');
    const namesAfterSort = await loggedInInventoryPage.getProductNames();
    const expectedNames = [...namesBeforeSort].sort((a, b) => b.localeCompare(a));

    expect(namesAfterSort).toEqual(expectedNames);
  });

  test('should open cart', async ({ loggedInInventoryPage, cartPage }) => {
    await loggedInInventoryPage.addToCart('Sauce Labs Backpack');
    await loggedInInventoryPage.openCart();
    await cartPage.isLoaded();
    expect(await cartPage.isItemInCart('Sauce Labs Backpack')).toBeTruthy();
  });
});
