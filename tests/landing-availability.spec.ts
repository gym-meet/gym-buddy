import { test, expect } from '@playwright/test';

test.describe('Landing Page Tests', () => {
  test('should load the landing page correctly', async ({ page }) => {
    await page.goto('https://gym-buddy-five.vercel.app/');

    const topMenu = await page.locator('nav.navbar');
    await expect(topMenu).toBeVisible();

    const background = await page.locator('.top-bg');
    await expect(background).toBeVisible();

    const footerMenu = await page.locator('footer.py-3');
    await expect(footerMenu).toBeVisible();
  });

  test('should have functional navigation links', async ({ page }) => {
    await page.goto('https://gym-buddy-five.vercel.app/');

    const signUpButton = page.locator('button.signup-button');
    await expect(signUpButton).toBeVisible();
    await signUpButton.click();
    await expect(page).toHaveURL(/auth\/signup/);

    await page.goto('https://gym-buddy-five.vercel.app/');

    const exploreLink = page.locator('nav a[href="/explore"]');
    await expect(exploreLink).toBeVisible();
    await exploreLink.click();
    await expect(page).toHaveURL(/explore/);

    await page.goto('https://gym-buddy-five.vercel.app/');

    const calendarLink = page.locator('a[href="/calendar"]');
    await expect(calendarLink).toBeVisible();
    await calendarLink.click();
    await expect(page).toHaveURL(/calendar/);
  });

  test('should display the correct page title and content', async ({ page }) => {
    await page.goto('https://gym-buddy-five.vercel.app/');

    const pageTitle = page.locator('title');
    await expect(pageTitle).toHaveText('Gym Buddy - Home'); // Confirm this matches your actual <title>

    const introText = page.locator('.text1');
    await expect(introText).toHaveText('A new way to enjoy the gym.');

    const scheduleText = page.locator('.schedule-text');
    await expect(scheduleText).toHaveText('Set your schedule and see how other people match it.');
  });

  test('should have a responsive off-canvas menu', async ({ page }) => {
    await page.goto('https://gym-buddy-five.vercel.app/');

    const burgerButton = page.locator('button.burger');
    await burgerButton.click();

    const offCanvas = page.locator('.offcanvas');
    await expect(offCanvas).toBeVisible();

    const homeLink = offCanvas.locator('a[href="/home"]');
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    await expect(page).toHaveURL('/home');

    const closeButton = page.locator('.side-bar-close');
    await closeButton.click();
    await expect(offCanvas).not.toBeVisible();
  });

  test('should show hero section call-to-action and scroll to signup section', async ({ page }) => {
    await page.goto('https://gym-buddy-five.vercel.app/');

    const ctaButton = page.locator('button.cta-join-now'); // Replace with actual class or text selector
    await expect(ctaButton).toBeVisible();

    await ctaButton.click();

    // You can adjust this based on how your scroll or navigation works
    const signupForm = page.locator('#signup-section'); // Replace with actual ID/selector
    await expect(signupForm).toBeVisible();
  });
});
