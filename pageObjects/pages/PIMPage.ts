import { Page, expect } from '@playwright/test';

export class PIMPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
 async navigateToPIM() {
  await this.page.locator('span:has-text("PIM")').click();
  await this.page.waitForURL(/pim/);
}

async verifyPIMLoaded() {
  await expect(
    this.page.locator('h6:has-text("PIM")')
  ).toBeVisible();
}


  }

