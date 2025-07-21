import { test, expect } from '../src/test-fixtures';
import { HomePage } from '../src/page/homePage';

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }, testInfo) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    try {
      expect(await homePage.isLoaded()).toBeTruthy();
    } catch (error) {
      await page.screenshot({ path: `test-results/homepage-failure-${testInfo.project.name}.png`, fullPage: true });
      throw error;
    }
  });
});
