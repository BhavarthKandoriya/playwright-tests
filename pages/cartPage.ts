import { Page } from '@playwright/test';
import { PlaywrightActions } from '../utilities/playwrightActions';
import { PlaywrightAssertions } from '../utilities/playwrightAssertions';

export class CartPage {
  readonly page: Page;
  readonly projectName: string;
  readonly placeOrderButton: string = '//button[text()="Place Order"]';
  readonly nameInput: string = '#name';
  readonly creditCardInput: string = '#card';
  readonly purchaseButton: string = '//button[text()="Purchase"]';
  readonly successMessage: string = '//h2[text()="Thank you for your purchase!"]';
  readonly cardDetails: string = '//p[contains(@class,"lead text-muted")]';
  readonly userDetails: string = '//p[contains(@class,"lead text-muted")]';
  playwrightActions: PlaywrightActions;
  playwrightAssertions: PlaywrightAssertions;

  constructor(page: Page, projectName: string) {
    this.playwrightActions = new PlaywrightActions(page);
    this.playwrightAssertions = new PlaywrightAssertions(page);
    this.page = page;
    this.projectName = projectName;
  }

  async placeOrder(){
    await this.playwrightActions.findAndClick(this.placeOrderButton);
    await this.playwrightActions.findAndType(this.nameInput, 'Tech Cipher');
    await this.playwrightActions.findAndType(this.creditCardInput, '0000000000');
    await this.playwrightActions.findAndClick(this.purchaseButton);
    await this.playwrightAssertions.inViewPort(this.successMessage);
    await this.playwrightAssertions.elementContainsText(this.cardDetails,'Card Number: 0000000000');
    await this.playwrightAssertions.elementContainsText(this.userDetails,'Name: Tech Cipher');
  }

  
}