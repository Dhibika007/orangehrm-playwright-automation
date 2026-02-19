import { Page, expect } from '@playwright/test';

export class LoginComponent {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string) {
    const usernameField = this.page.locator('input[name="username"]');
    const passwordField = this.page.locator('input[name="password"]');
    const loginButton = this.page.getByRole('button', { name: 'Login' });

    await expect(usernameField).toBeVisible();
    await usernameField.fill(username);

    await expect(passwordField).toBeVisible();
    await passwordField.fill(password);

    await expect(loginButton).toBeEnabled();
    await loginButton.click();
  }
}
