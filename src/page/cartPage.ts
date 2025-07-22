import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async isLoaded() {
    await expect(this.page.locator('.cart_list')).toBeVisible();
    return true;
  }

  async getCartItems() {
    return await this.page.locator('.cart_item').all();
  }

  async isItemInCart(itemName: string): Promise<boolean> {
    const cartItem = this.page.locator('.cart_item').filter({ hasText: itemName });
    return await cartItem.isVisible();
  }

  async getItemQuantity(itemName: string): Promise<string> {
    const cartItem = this.page.locator('.cart_item').filter({ hasText: itemName });
    return await cartItem.locator('.cart_quantity').textContent() || '0';
  }

  async getItemPrice(itemName: string): Promise<string> {
    const cartItem = this.page.locator('.cart_item').filter({ hasText: itemName });
    return await cartItem.locator('.inventory_item_price').textContent() || '';
  }

  async removeItem(itemName: string) {
    const cartItem = this.page.locator('.cart_item').filter({ hasText: itemName });
    await cartItem.locator('.cart_button').click();
  }

  async continueShopping() {
    await this.page.click('.cart_footer .btn_secondary');
  }

  async checkout() {
    await this.page.click('.cart_footer .btn_action');
  }
} 