import { Page, expect } from '@playwright/test';

export class EmployeeFormComponent {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickAddEmployee() {
    await this.page.getByRole('button', { name: 'Add' }).click();

    // Wait for Add Employee page to fully render
    await expect(
      this.page.getByRole('heading', { name: 'Add Employee' })
    ).toBeVisible({ timeout: 10000 });
  }

  async fillEmployeeDetails(firstName: string, lastName: string) {

    const firstNameField = this.page.getByRole('textbox', { name: 'First Name' });
    const lastNameField = this.page.getByRole('textbox', { name: 'Last Name' });

    // Based on codegen: Employee ID is 5th textbox on page
    const employeeIdField = this.page.getByRole('textbox').nth(4);

    await expect(firstNameField).toBeVisible();
    await expect(lastNameField).toBeVisible();
    await expect(employeeIdField).toBeVisible();

    await firstNameField.fill(firstName);
    await lastNameField.fill(lastName);

    // Clear default ID and generate unique ID
   const uniqueId = Date.now().toString().slice(-10);
await employeeIdField.fill(uniqueId);

  }

  async saveEmployee() {
    const saveButton = this.page.getByRole('button', { name: 'Save' });

    await expect(saveButton).toBeEnabled();

    await Promise.all([
      this.page.waitForURL(/viewPersonalDetails/, { timeout: 20000 }),
      saveButton.click(),
    ]);
  }
}
