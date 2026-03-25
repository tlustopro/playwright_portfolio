import { expect, Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async isLoaded() {
    await expect(this.page.locator('.cart_list')).toBeVisible();
    await expect(this.page).toHaveURL(/cart\.html/);
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
    return (await cartItem.locator('.inventory_item_price').textContent())?.trim() ?? '';
  }

  async removeItem(itemName: string) {
    const cartItem = this.page.locator('.cart_item').filter({ hasText: itemName });
    await cartItem.locator('.cart_button').click();
  }

  async continueShopping() {
    await this.page.click('.cart_footer .btn_secondary');
    await expect(this.page).toHaveURL(/inventory\.html/);
  }

  async checkout() {
    await this.page.click('.cart_footer .btn_action');
  }
} 
