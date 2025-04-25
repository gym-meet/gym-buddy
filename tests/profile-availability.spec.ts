import { test, expect } from '@playwright/test';

test.use({
  storageState: 'admin-auth.json',
});

test.describe('Profile Page Tests', () => {
  test('Profile page is available and form operates with legal inputs', async ({ page }) => {
    await page.goto('https://gym-buddy-five.vercel.app/profile');

    // 1. Page loads with heading
    await expect(page.getByRole('heading', { name: 'My Profile' })).toBeVisible();

    // 2. Fill out account info
    // await page.getByPlaceholder('Username').fill('testuser');
    // await page.getByPlaceholder('New Password (optional)').fill('securePassword123');

    // 3. Fill out contact info
    await page.getByPlaceholder('Email Address').fill('test@example.com');
    await page.getByPlaceholder('Phone Number').fill('8081234567');
    await page.getByPlaceholder('Instagram Username').fill('test_insta');
    await page.getByPlaceholder('Twitter Handle').fill('test_twitter');
    await page.getByPlaceholder('LinkedIn Profile URL').fill('https://linkedin.com/in/test');

    // 4. Toggle some preferred days
    await page.getByLabel('Monday').check();
    await page.getByLabel('Friday').check();

    // 5. Select workout types
    await page.getByLabel('Running').check();
    await page.getByLabel('Free Weights').check();

    // 6. Select gender
    await page.getByLabel('Gender').selectOption('Female');

    // 7. Enter experience
    await page.getByLabel(/fitness experience/i).fill('Been training for 2 years regularly.');

    // 8. Submit the form
    await page.getByRole('button', { name: /save profile/i }).click();

    // Optionally, expect a toast or console message if you hook it up later
  });
});
