import { test as base, expect } from '@playwright/test';

const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    try {
      await use(page);
    } catch (error) {
      await page.screenshot({ path: `test-results/failure-${testInfo.title}-${testInfo.project.name}.png`, fullPage: true });
      throw error;
    }
  },
});

export { test, expect };
