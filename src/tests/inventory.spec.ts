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

  test('should sort products by name in descending order', async ({ loggedInInventoryPage }) => {
    const namesBeforeSort = await loggedInInventoryPage.getProductNames();
    await loggedInInventoryPage.sortProducts('za');
    const namesAfterSort = await loggedInInventoryPage.getProductNames();
    const expectedNames = [...namesBeforeSort].sort((a, b) => b.localeCompare(a));

    expect(namesAfterSort).toEqual(expectedNames);
  });

  test('should sort products by cheapest to most expensive', async ({ loggedInInventoryPage }) => {
    const pricesBeforeSort = await loggedInInventoryPage.getProductPrices();
    await loggedInInventoryPage.sortProducts('lohi');
    const pricesAfterSort = await loggedInInventoryPage.getProductPrices();
    const expectedPrices = [...pricesBeforeSort].sort((a, b) => parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', '')));

    expect(pricesAfterSort).toEqual(expectedPrices);
  });

  test('should sort products by expensive to most cheapest', async ({ loggedInInventoryPage }) => {
    const pricesBeforeSort = await loggedInInventoryPage.getProductPrices();
    await loggedInInventoryPage.sortProducts('hilo');
    const pricesAfterSort = await loggedInInventoryPage.getProductPrices();
    const expectedPrices = [...pricesBeforeSort].sort((a, b) => parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', '')));

    expect(pricesAfterSort).toEqual(expectedPrices);
  });

  test('should open cart', async ({ loggedInInventoryPage, cartPage }) => {
    await loggedInInventoryPage.addToCart('Sauce Labs Backpack');
    await loggedInInventoryPage.openCart();
    await cartPage.isLoaded();
    expect(await cartPage.isItemInCart('Sauce Labs Backpack')).toBeTruthy();
  });
});
