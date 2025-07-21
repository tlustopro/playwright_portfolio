import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.rohlik.cz');
    await this.page.click('[data-test="header-user-icon"]');
  }

  async login(username: string, password: string) {
    await this.page.fill('input[type="email"]', username);
    await this.page.fill('input[type="password"]', password);
    await this.page.click('button[type="submit"]');
  }

  async isLoggedIn() {
    const userIcon = this.page.locator('[data-test="header-user-icon"]');
    await expect(userIcon).toHaveText("DA", { timeout: 10000 }); // waits up to 10s
    return true;
  }
} 