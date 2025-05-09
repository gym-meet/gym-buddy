// tests/auth.admin.setup.ts
import { test as setup } from '@playwright/test';

setup('authenticate as admin', async ({ page }) => {
  await page.goto('https://gym-buddy-five.vercel.app/auth/signin');
  await page.getByPlaceholder('Email').fill('admin@foo.com');
  await page.getByPlaceholder('Password').fill('changeme');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.waitForTimeout(1000);
  await page.goto('https://gym-buddy-five.vercel.app/profile');
  await page.context().storageState({ path: 'vercel-admin-auth.json' });
});
