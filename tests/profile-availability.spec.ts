// tests/profile-availability.spec.ts
import { test, expect } from '@playwright/test';
import { ProfilePage } from './page-objects/ProfilePage';

test.describe('Profile Page Availability', () => {
  test.use({ storageState: 'tests/vercel-admin-auth.json' });

  test('admin can fill and save profile form', async ({ page }) => {
    const profilePage = new ProfilePage(page);

    await profilePage.goto();

    // Fill in the form
    await profilePage.fillProfileForm({
      changeUsername: 'Admin1',
      newPassword: 'Waiobruno21!',
      email: 'admin@hawaii.edu',
      phone: '8084550943',
      instagram: 'admins',
      twitter: 'admin',
      linkedin: 'linkedin.com',
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      types: ['Running', 'Mixed', 'Free Weights', 'Machines', 'Calisthenics'],
      gender: 'Male',
      fitnessDescription: 'Hi my name is admin and I workout.',
    });

    await profilePage.saveProfile();

    // ✅ Add a success message check (adjust to your actual app)
    // Click Save
    await page.getByRole('button', { name: 'Save Profile' }).click();
    console.log('✅ Clicked Save Profile');

    await page.waitForTimeout(5000); // Wait 5 seconds to allow the banner to appear

    await page.screenshot({ path: 'banner-check.png', fullPage: true });

    console.log('✅ Took a screenshot after saving');

    // Screenshot right after clicking Save
    await page.screenshot({ path: 'after-save-click.png', fullPage: true });

    // Look for the success banner again
    const successBanner = page.locator('div.alert.alert-success');

    // NEW: Wait up to 30 seconds for the banner to appear
    await expect(successBanner).toBeVisible({ timeout: 30000 });

    // Log the text (for confirmation)
    const bannerText = await successBanner.textContent();
    console.log('✅ Banner appeared with text:', bannerText);
  });
});
