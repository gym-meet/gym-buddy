import { test, expect } from '@playwright/test';

test('FAQ page availability and accordion expands', async ({ page }) => {
  await page.goto('https://gym-buddy-five.vercel.app/faq');

  // Confirm FAQ heading is visible
  await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible();

  const headers = page.locator('.accordion-button');
  const bodies = page.locator('.accordion-body');

  const count = await headers.count();
  for (let i = 0; i < count; i++) {
    const header = headers.nth(i);
    const body = bodies.nth(i);

    console.log(`▶️ Clicking header ${i + 1}`);
    await header.click();

    // ✅ Check that the body content is now visible (instead of aria-expanded)
    await expect(body).toBeVisible({ timeout: 5000 });

    console.log(`✅ Body ${i + 1} is visible.`);
  }
});
