import { test } from '@playwright/test';
import { DashboardPage } from '../pageObjects/pages/DashboardPage';

test('Verify Dashboard and navigate to PIM successfully', async ({ page }) => {

  const dashboard = new DashboardPage(page);

  // Navigate directly to dashboard
  await page.goto('/web/index.php/dashboard/index', {
    waitUntil: 'domcontentloaded'
  });

  // Verify dashboard is loaded
  await dashboard.verifyDashboardLoaded();

  // Navigate to PIM and verify
  await dashboard.navigateToPIM();

});
