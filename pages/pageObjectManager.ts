/* This file will contain the methods to create object for page class. 
So that we can import single PageObjectManager class in test case to create object for page classes by invoking methods.*/
import { LoginPage } from './loginPage';
import { Page } from '@playwright/test';
import { ProductPage } from './productPage';
import { ProductDetailsPage } from './productDetails';
import { CartPage } from './cartPage';
import { CommonPage } from './commonPage';


export class PageObjectManager {
  productPage: ProductPage;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
  loginPage: LoginPage;
  commonPage: CommonPage;

  constructor(page: Page, projectName: string) {
    this.loginPage = new LoginPage(page, projectName);
    this.productPage = new ProductPage(page, projectName);
    this.productDetailsPage = new ProductDetailsPage(page, projectName);
    this.cartPage = new CartPage(page, projectName);
    this.commonPage = new CommonPage(page, projectName);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getProductPage() {
    return this.productPage;
  }

  getProductDetailsPage() {
    return this.productDetailsPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getCommonPage() {
    return this.commonPage;
  }

}