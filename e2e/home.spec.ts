import { test, expect } from '@playwright/test';

test('shows the bagel photo and navigation', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('img', { name: 'Fresh Brick Street bagels stacked on the bakery counter' })).toBeVisible();
  await page.getByRole('button', { name: 'Contact', exact: true }).click();
  await expect(page.getByRole('link', { name: 'brick.street.bagels@gmail.com' }).first()).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#nav-panel')).toHaveCount(0);
});
