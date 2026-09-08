import { test, expect } from '@playwright/test';

test('homepage shows Hello', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Hello' })).toBeVisible();
});
