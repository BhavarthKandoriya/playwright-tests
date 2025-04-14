/* Files under seller directory contains the automation scripts to simulate the Seller user journeys.
Test files will invoke the methods of the page files to perform the UI actions. */

import { test } from '@playwright/test';
import { PageObjectManager } from '../pages/pageObjectManager';

test.describe('', () => {
  let poManager: PageObjectManager;

  test.beforeEach(async ({ page }, workerInfo) => {
    poManager = new PageObjectManager(page, workerInfo.project.name);
  });

  test('Add product to cart and place order', async ({ page, baseURL }) => {
      const commonPage = poManager.getCommonPage();
      await commonPage.navigateToUrl();
      const loginPage = await commonPage.clickLogInLink(poManager);
      const productPage = await loginPage.accountLogin(poManager, 'techcipher@gmail.com', 'test@123');
      const productDetailsPage = await productPage.openProductDetails(poManager);
      await productDetailsPage.addToCart();
      const cartPage = await commonPage.clickCartLink(poManager);
      await cartPage.placeOrder();
  });
});