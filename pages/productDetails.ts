import { Page } from '@playwright/test';
import { PlaywrightActions } from '../utilities/playwrightActions';
import { PlaywrightAssertions } from '../utilities/playwrightAssertions';

export class ProductDetailsPage {
  readonly page: Page;
  readonly projectName: string;
  readonly addToCartButton: string = '//a[text()="Add to cart"]';
  readonly signInButton: string = '[data-id="sign_in_button"]';
  readonly emailInput: string = '[id="email-input"]';
  readonly continueButton: string = '[id="continue_button"]';
  readonly passwordInput: string = '[id="password-input"]';
  readonly profileLink: string = '[data-id="profile_link"]';
  readonly accountExistLink : string = 'text="Already have an account?"';
  readonly getStartedButton: string = 'a:text("Get started")';
  playwrightActions: PlaywrightActions;
  playwrightAssertions: PlaywrightAssertions;

  constructor(page: Page, projectName: string) {
    this.playwrightActions = new PlaywrightActions(page);
    this.playwrightAssertions = new PlaywrightAssertions(page);
    this.page = page;
    this.projectName = projectName;
  }

  async addToCart(){
    await this.playwrightActions.findAndClick(this.addToCartButton);
  }

  
}