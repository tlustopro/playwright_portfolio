import { expect, test } from '../fixtures/test-fixtures';

test.describe('Shopping Cart Functionality', () => {
  test('should add single item to cart and verify cart contents', async ({
    loggedInInventoryPage,
    cartPage,
  }) => {
    const itemName = 'Sauce Labs Backpack';

    expect(await loggedInInventoryPage.getCartCount()).toBe('0');
    await loggedInInventoryPage.addToCart(itemName);
    expect(await loggedInInventoryPage.getCartCount()).toBe('1');
    expect(await loggedInInventoryPage.isRemoveButtonVisible(itemName)).toBeTruthy();

    const inventoryPrice = await loggedInInventoryPage.getProductPrice(itemName);

    await loggedInInventoryPage.openCart();
    await cartPage.isLoaded();

    expect(await cartPage.isItemInCart(itemName)).toBeTruthy();
    expect(await cartPage.getItemQuantity(itemName)).toBe('1');
    expect(await cartPage.getItemPrice(itemName)).toBe(inventoryPrice);
  });

  test('should add multiple items to cart and verify cart contents', async ({
    loggedInInventoryPage,
    cartPage,
  }) => {
    const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

    for (const itemName of items) {
      await loggedInInventoryPage.addToCart(itemName);
    }

    expect(await loggedInInventoryPage.getCartCount()).toBe(items.length.toString());
    await loggedInInventoryPage.openCart();
    await cartPage.isLoaded();

    for (const itemName of items) {
      expect(await cartPage.isItemInCart(itemName)).toBeTruthy();
      expect(await cartPage.getItemQuantity(itemName)).toBe('1');
    }
  });

  test('should remove item from cart and verify cart update', async ({
    loggedInInventoryPage,
  }) => {
    const itemName = 'Sauce Labs Backpack';

    await loggedInInventoryPage.addToCart(itemName);
    expect(await loggedInInventoryPage.getCartCount()).toBe('1');
    await loggedInInventoryPage.removeFromCart(itemName);
    expect(await loggedInInventoryPage.getCartCount()).toBe('0');
    expect(await loggedInInventoryPage.isAddToCartButtonVisible(itemName)).toBeTruthy();
  });

  test('should remove item from cart page and verify cart update', async ({
    loggedInInventoryPage,
    cartPage,
  }) => {
    const itemName = 'Sauce Labs Backpack';

    await loggedInInventoryPage.addToCart(itemName);
    await loggedInInventoryPage.openCart();
    await cartPage.removeItem(itemName);
    expect(await cartPage.isItemInCart(itemName)).toBeFalsy();
    await cartPage.continueShopping();
    expect(await loggedInInventoryPage.isAddToCartButtonVisible(itemName)).toBeTruthy();
  });
});
