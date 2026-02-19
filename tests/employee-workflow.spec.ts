import { expect, test } from '@playwright/test';
import { EmployeeFormComponent } from '../pageObjects/components/EmployeeFormComponent';
import { DashboardPage } from '../pageObjects/pages/DashboardPage';
import { PIMPage } from '../pageObjects/pages/PIMPage';
import { generateEmployee } from '../utils/testdata';
import { EmployeeTableComponent } from '../pageObjects/components/EmployeeTableComponent';

test.describe('Employee Workflow Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Starting from Dashboard
    await page.goto('/web/index.php/dashboard/index', {
      waitUntil: 'domcontentloaded'
    });
  });

  test('Add new employee successfully', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const pim = new PIMPage(page);
    const employeeForm = new EmployeeFormComponent(page);

    await dashboard.navigateToPIM();
    await pim.verifyPIMLoaded();

    const employee = generateEmployee();

    await employeeForm.clickAddEmployee();
    await employeeForm.fillEmployeeDetails(employee.firstName, employee.lastName);
    await employeeForm.saveEmployee();

// UI assertion
await expect(
  page.getByRole('heading', { name: 'Personal Details' })
).toBeVisible();

  });

  test('Validating mandatory fields when adding employee', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  const pim = new PIMPage(page);
  const employeeForm = new EmployeeFormComponent(page);

  await page.goto('/');
  await dashboard.navigateToPIM();
  await pim.verifyPIMLoaded();

  await employeeForm.clickAddEmployee();
  await page.getByRole('button', { name: 'Save' }).click();

  // Inline error messages
  await expect(
    page.locator('.oxd-input-field-error-message')
  ).toHaveCount(2);
});

test('Add employee and search dynamically', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  const pim = new PIMPage(page);
  const employeeForm = new EmployeeFormComponent(page);
  const employeeTable = new EmployeeTableComponent(page);

  await page.goto('/web/index.php/dashboard/index', {
    waitUntil: 'domcontentloaded'
  });

  await dashboard.navigateToPIM();
  await pim.verifyPIMLoaded();

  // Generate employee dynamically
  const employee = generateEmployee();
  const partialName = employee.firstName.substring(0, 3);

  // Add employee
  await employeeForm.clickAddEmployee();
  await employeeForm.fillEmployeeDetails(
    employee.firstName,
    employee.lastName
  );
  await employeeForm.saveEmployee();

  await expect(
    page.getByRole('heading', { name: 'Personal Details' })
  ).toBeVisible();

  await employeeTable.navigateToEmployeeTable();

  // Search using dynamic dropdown
  const input = page.locator('input[placeholder="Type for hints..."]').first();
  await expect(input).toBeVisible();
  await input.fill(partialName);

  // Wait for dropdown suggestions
  const listbox = page.getByRole('listbox');
  await expect(listbox).toBeVisible();

  const options = listbox.getByRole('option');
  await expect(options.first()).toBeVisible();

  // Click the correct dynamic option
  await page
    .getByRole('option', { name: new RegExp(employee.firstName, 'i') })
    .click();
  await page.waitForTimeout(300);

  // Click Search
  await page.getByRole('button', { name: 'Search' }).click();

  //  UI assertion for search results
  await expect(
    page.getByText('(1) Record Found')
  ).toBeVisible();

  // Second UI assertion for employee presence in table
  await expect(
    page.locator('.oxd-table-body')
      .getByText(employee.firstName, { exact: false })
  ).toBeVisible();
});



test('Delete first employee from list', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  const pim = new PIMPage(page);

  await page.goto('/');
  await dashboard.navigateToPIM();
  await pim.verifyPIMLoaded();

  // Ensure employee table is visible
  const firstRow = page.locator('.oxd-table-card').first();
  await expect(firstRow).toBeVisible();

  // Click delete icon in first row
  const deleteButton = firstRow.locator('.bi-trash');
  await deleteButton.click();

  // Verify confirmation dialog appears
  await expect(
    page.getByText('Are you Sure?')
  ).toBeVisible();

//Pop-up confirmation
  await page.getByRole('button', { name: 'Yes, Delete' }).click();

  // Verify toast message (partial match)
  await expect(
    page.locator('.oxd-toast-container')
  ).toContainText('Successfully', { timeout: 10000 });
});

});
