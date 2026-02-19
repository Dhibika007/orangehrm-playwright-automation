import { test as setup, expect } from '@playwright/test';
import { LoginComponent } from '../pageObjects/components/LoginComponent';

setup('authenticate', async ({ page }) => {

  await page.goto('/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  const login = new LoginComponent(page);

  await login.login('Admin', 'admin123');

  // Wait for dashboard heading instead of URL
  await expect(
    page.getByRole('heading', { name: 'Dashboard' })
  ).toBeVisible({ timeout: 60000 });

  await page.context().storageState({ path: 'storageState.json' });

});
