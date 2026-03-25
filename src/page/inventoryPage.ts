import { expect, Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com/v1/inventory.html');
  }

  async isLoaded() {
    const inventoryContainer = this.page.locator('.inventory_container');
    await expect(inventoryContainer).toBeVisible();
    await expect(this.page).toHaveURL(/inventory\.html/);
  }

  async addToCart(itemName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    await item.locator('.btn_primary').click();
    // Verify the button text changed to "REMOVE"
    await expect(item.locator('.btn_secondary')).toBeVisible();
  }

  async removeFromCart(itemName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    await item.locator('.btn_secondary').click();
    // Verify the button text changed back to "ADD TO CART"
    await expect(item.locator('.btn_primary')).toBeVisible();
  }

  async getCartCount(): Promise<string> {
    const cartBadge = this.page.locator('.shopping_cart_badge');
    if (await cartBadge.isVisible()) {
      return (await cartBadge.textContent())?.trim() ?? '0';
    }
    return '0';
  }

  async openCart() {
    await this.page.click('.shopping_cart_link');
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.page.locator('.cart_list')).toBeVisible();
  }

  async sortProducts(sortOption: string) {
    await this.page.selectOption('.product_sort_container', sortOption);
  }

  async getProductPrice(itemName: string): Promise<string> {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    return (await item.locator('.inventory_item_price').textContent())?.trim() ?? '';
  }

  async isAddToCartButtonVisible(itemName: string): Promise<boolean> {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    return await item.locator('.btn_primary').isVisible();
  }

  async isRemoveButtonVisible(itemName: string): Promise<boolean> {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    return await item.locator('.btn_secondary').isVisible();
  }

  async getProductNames(): Promise<string[]> {
    return (await this.page.locator('.inventory_item_name').allTextContents()).map((name) =>
      name.trim()
    );
  }
  async getProductPrices(): Promise<string[]> {
    return (await this.page.locator('.inventory_item_price').allTextContents()).map((price) =>
      price.trim()
    );
  }
}
