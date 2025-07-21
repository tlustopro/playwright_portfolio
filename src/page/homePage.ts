import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.rohlik.cz');
  }

  async isLoaded() {
    // Example: check for a visible element unique to homepage
    return await this.page.isVisible('header');
  }
}
