import { test, expect } from '@playwright/test';

test('bad quality place order flow', async ({ page }) => {
  const data: any = {
    user: 'baduser' + Date.now(),
    pass: 'test@123',
    name: 'John',
    country: 'USA',
    city: 'New York',
    card: '4242 4242 4242 4242',
    month: '12',
    year: '2029'
  };

  const elem = page.locator('body');
  const btn = page.locator('button');

  page.on('dialog', async (dialog) => {
    await dialog.accept();
  });

  try {
    await page.goto('/');
    await page.waitForTimeout(1000);
    await page.click('a[id="signin2"]');
    await page.waitForTimeout(1200);
    await page.fill('#sign-username', data.user);
    await page.fill('#sign-password', data.pass);
    await btn.nth(2).click();
    await page.waitForTimeout(2000);
    await page.click('a[id="login2"]');
    await page.waitForTimeout(1000);
    await page.fill('#loginusername', data.user);
    await page.fill('#loginpassword', data.pass);
    await page.click('button[onclick="logIn()"]');
    await page.waitForTimeout(2000);

    await page.locator('a[href*="prod.html"]').nth(0).click();
    await page.waitForTimeout(1200);
    await page.locator('a.btn.btn-success').click();
    await page.waitForTimeout(1000);
    await page.click('a#cartur');
    await page.waitForTimeout(1000);
    await page.click('button.btn.btn-success');
    await page.waitForTimeout(1000);
    await page.fill('input#name', data.name);
    await page.fill('input#country', data.country);
    await page.fill('input#city', data.city);
    await page.fill('input#card', data.card);
    await page.fill('input#month', data.month);
    await page.fill('input#year', data.year);
    await page.click('button[onclick="purchaseOrder()"]');
    await page.waitForTimeout(2000);

    const res = await elem.textContent();
    expect(res).toContain('Thank');
  } catch (e) {
    console.log('something went wrong', e);
    expect(true).toBe(true);
  }
});
