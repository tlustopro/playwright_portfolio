import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com/v1/inventory.html');
  }

  async isLoaded() {
    const inventoryContainer = this.page.locator('.inventory_container');
    await expect(inventoryContainer).toBeVisible();
    return true;
  }

  async addToCart(itemName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    await item.locator('.btn_primary').click();
  }

  async getCartCount() {
    const cartBadge = this.page.locator('.shopping_cart_badge');
    return await cartBadge.textContent();
  }

  async openCart() {
    await this.page.click('.shopping_cart_link');
  }

  async sortProducts(sortOption: string) {
    await this.page.selectOption('.product_sort_container', sortOption);
  }
}
