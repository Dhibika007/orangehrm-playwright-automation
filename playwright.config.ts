import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,
  workers: 1,
  retries: 1,

  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    headless: false,
    navigationTimeout: 60000,
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        storageState: 'storageState.json',  
      },
      dependencies: ['setup'],
    },
  ],
});
