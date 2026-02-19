import { Page, expect } from '@playwright/test';

export class DashboardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyDashboardLoaded() {
    await expect(
      this.page.locator('h6:has-text("Dashboard")')
    ).toBeVisible();
  }

  async navigateToPIM() {
    await this.page.getByRole('link', { name: 'PIM' }).click();

    await expect(
      this.page.getByText('Employee Information')
    ).toBeVisible();
  }
}
