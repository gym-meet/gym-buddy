import { test, expect } from '@playwright/test';

test.describe('Home Page Availability', () => {
  test('should display hero, about, and footer sections correctly', async ({ page }) => {
    await page.goto('https://gym-buddy-five.vercel.app/home');

    // ✅ Check Hero Section
    const videoFrame = page.locator('iframe[title="YouTube video player"]');
    await expect(videoFrame).toBeVisible();

    const heroHeading = page.getByRole('heading', { name: 'Find your next gym buddy!' });
    await expect(heroHeading).toBeVisible();

    const heroDescription = page.getByText('Explore buddies in the Explore page.');
    await expect(heroDescription).toBeVisible();

    // ✅ Check About Section
    const aboutHeading = page.getByRole('heading', { name: 'About' });
    await expect(aboutHeading).toBeVisible();

    const aboutTextSnippet = 'Welcome to our website! We are a passionate team';
    await expect(page.getByText(aboutTextSnippet, { exact: false })).toBeVisible();

    // ✅ Check Footer
    const rulesLink = page.getByRole('link', { name: 'Rules & Policies' });
    await expect(rulesLink).toBeVisible();

    const campusMapLink = page.getByRole('link', { name: 'Campus Map' });
    await expect(campusMapLink).toBeVisible();

    const gymHoursText = 'Mon-Thur | 6AM - 10:30PM';
    await expect(page.getByText(gymHoursText)).toBeVisible();
  });
});
