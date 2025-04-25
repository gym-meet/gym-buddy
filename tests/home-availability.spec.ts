import { test, expect } from '@playwright/test';

test('home page should load with all sections', async ({ page }) => {
  // Navigate to the home page
  await page.goto('https://gym-buddy-five.vercel.app/home');

  // Check that the TopMenu is visible (navbar)
  const topMenu = await page.locator('nav.navbar');
  await expect(topMenu).toBeVisible();

  // Check that the HeroSection is visible
  const heroSection = await page.locator('section.hero-section'); // Update if HeroSection has a more specific class
  await expect(heroSection).toBeVisible();

  // Check that the AboutSection is visible
  const aboutSection = await page.locator('section.about-section'); // Update if AboutSection has a more specific class
  await expect(aboutSection).toBeVisible();

  // Check that the FooterMenu is visible
  const footer = await page.locator('footer');
  await expect(footer).toBeVisible();
});
