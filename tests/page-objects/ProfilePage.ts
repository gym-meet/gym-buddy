// tests/page-objects/ProfilePage.ts
import { Page, Locator } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly changeUsernameInput: Locator;
  readonly newPasswordInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly instagramInput: Locator;
  readonly twitterInput: Locator;
  readonly linkedinInput: Locator;
  readonly fitnessDescriptionInput: Locator;
  readonly genderSelect: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username', exact: true });
    this.changeUsernameInput = page.getByRole('textbox', { name: 'Change Username' });
    this.newPasswordInput = page.getByRole('textbox', { name: 'New Password' });
    this.emailInput = page.getByRole('textbox', { name: 'Email Address' });
    this.phoneInput = page.getByRole('textbox', { name: 'Phone Number' });
    this.instagramInput = page.getByRole('textbox', { name: 'Instagram Username' });
    this.twitterInput = page.getByRole('textbox', { name: 'Twitter Handle' });
    this.linkedinInput = page.getByRole('textbox', { name: 'LinkedIn Profile URL' });
    this.genderSelect = page.getByLabel('Gender');
    this.fitnessDescriptionInput = page.getByRole('textbox', { name: 'Describe your fitness' });
    this.saveButton = page.getByRole('button', { name: 'Save Profile' });
  }

  async goto() {
    await this.page.goto('https://gym-buddy-five.vercel.app/profile');
  }

  async fillProfileForm(data: {
    changeUsername: string;
    newPassword: string;
    email: string;
    phone: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    days: string[];
    types: string[];
    gender: string;
    fitnessDescription: string;
  }) {
    await this.usernameInput.click(); // To focus the form (if needed)
    await this.changeUsernameInput.fill(data.changeUsername);
    await this.newPasswordInput.fill(data.newPassword);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
    await this.instagramInput.fill(data.instagram);
    await this.twitterInput.fill(data.twitter);
    await this.linkedinInput.fill(data.linkedin);

    // Select workout days
    for (const day of data.days) {
      const checkbox = this.page.getByRole('checkbox', { name: day });
      if (!(await checkbox.isChecked())) {
        await checkbox.check();
      }
    }

    // Select workout types
    for (const type of data.types) {
      const checkbox = this.page.getByRole('checkbox', { name: type });
      if (!(await checkbox.isChecked())) {
        await checkbox.check();
      }
    }

    await this.genderSelect.selectOption(data.gender);
    await this.fitnessDescriptionInput.fill(data.fitnessDescription);
  }

  async saveProfile() {
    await this.saveButton.click();
  }
}
