import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com/v1/');
  }

  async login(username: string, password: string) {
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
    await this.page.click('[type="submit"]');
  }

  async isLoggedIn() {
    const inventoryContainer = this.page.locator('.inventory_container');
    await expect(inventoryContainer).toBeVisible({ timeout: 10000 }); // waits up to 10s
    return true;
  }

  async getErrorMessage() {
    const errorMessage = this.page.locator('[data-test="error"]');
    return await errorMessage.textContent();
    await expect(errorMessage).toHaveText("Epic sadface", { timeout: 10000 }); // waits up to 10s  
    }
} 