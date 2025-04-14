import { devices } from '@playwright/test';
import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 50000,
  fullyParallel: true,
  reporter: [['html', { open: 'never' }]],
  testMatch: '*.*.ts',
  projects: [
    {
      name: 'Mobile Android',
      use: {
        ...devices['Galaxy S III'],
        browserName: 'chromium',
        channel: 'chrome'
      }
    },
    {
      name: 'Chrome',
      use: {
        ...devices['Desktop Chrome']
      }
    },
    {
      name: 'Mobile iPhone',
      use: {
        ...devices['iPhone 13 Pro']
      }
    },
    {
      name: 'Safari',
      use: {
        ...devices['Desktop Safari']
      }
    }
  ],
  use: {
    video: 'on',
    actionTimeout: 20000,
    baseURL: 'https://demoblaze.com',
    trace: 'retain-on-failure'
  },
  expect: {
    timeout: 20000
  }
};
export default config;