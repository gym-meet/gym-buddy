import { test, expect } from '@playwright/test';

test.describe('Explore Page', () => {
  test('should load explore page and display gym partner profiles', async ({ page }) => {
    // Go to the explore page
    await page.goto('https://gym-buddy-five.vercel.app/explore'); // Use your deployed URL

    // Check if the page title is correct
    await expect(page).toHaveTitle(/Find Your Gym Partner/);

    // Ensure the header "Find Your Gym Partner" is present
    await expect(page.locator('h2')).toHaveText('Find Your Gym Partner');

    // Check if the profiles are loaded (assuming at least one user is present)
    const profiles = page.locator('.card');
    await expect(await profiles.count()).toBeGreaterThan(0);

    // Check that no gym partner found message appears when there are no profiles
    const noPartnersMessage = page.locator('text=No gym partners found. Be the first to sign up!');
    await expect(noPartnersMessage).toBeVisible();
  });

  test('should display profile card details correctly', async ({ page }) => {
    // Go to the explore page
    await page.goto('https://gym-buddy-five.vercel.app/explore'); // Use your deployed URL

    // Ensure profile card contains display name, bio, and schedule
    const profileCard = page.locator('.card').first();
    await expect(profileCard.locator('h5')).toHaveText(/^[a-zA-Z0-9_]+$/); // Check for display name
    await expect(profileCard.locator('p.text-muted')).toHaveText('Looking forward to meeting new gym buddies!');
    // Check bio

    // Check if schedule badges are visible (based on random schedule logic)
    const scheduleBadges = profileCard.locator('.badge');
    await expect(await scheduleBadges.count()).toBeGreaterThan(0);
  });

  test('should allow filter button interaction', async ({ page }) => {
    // Go to the explore page
    await page.goto('https://gym-buddy-five.vercel.app/explore'); // Use your deployed URL

    // Click the filter button
    await page.locator('button.btn-outline-dark').click();

    // Ensure the filter button is still visible after click (assuming it does not hide)
    await expect(page.locator('button.btn-outline-dark')).toBeVisible();
  });
});
