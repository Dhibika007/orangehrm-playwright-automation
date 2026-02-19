import { Page, expect } from '@playwright/test';

export class EmployeeTableComponent {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToEmployeeTable() {
  await this.page.getByRole('link', { name: 'Employee List' }).click();

  await expect(
    this.page.getByText('Employee Information')
  ).toBeVisible();
}


  async searchEmployee(name: string, useDropdown = false) {
  const input = this.page
    .locator('input[placeholder="Type for hints..."]')
    .first();

  await input.fill(name.substring(0, 4));

  const listbox = this.page.getByRole('listbox');

  // Capturing the list with parent element => waiting for dropdown to appear
  await listbox.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});

  const options = listbox.getByRole('option');
  const count = await options.count();

  for (let i = 0; i < count; i++) {
    const text = await options.nth(i).innerText();

    if (text.includes(name)) {
      await options.nth(i).click();
      break;
    }
  }

  await this.page.getByRole('button', { name: 'Search' }).click();
}


  async verifyEmployeePresent(name: string) {
    await expect(
      this.page.locator('.oxd-table-body').getByText(name)
    ).toBeVisible();
  }

  async deleteFirstResult() {
    const firstRow = this.page.locator('.oxd-table-card').first();
    await expect(firstRow).toBeVisible();

    await firstRow.locator('.bi-trash').click();

    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();

    await this.page.waitForLoadState('networkidle');
  }

  async verifyDeleteSuccess() {
    await expect.soft(
      this.page.getByText('Successfully Deleted', { exact: true })
    ).toBeVisible({ timeout: 5000 });
  }

  async verifyEmployeeNotPresent(name: string) {
    await expect(
      this.page.locator('.oxd-table-body').getByText(name)
    ).toHaveCount(0);
  }

  async resetSearch() {
    await this.page.locator('button[type="reset"]').click();
    await this.page.waitForLoadState('networkidle');
  }
}
