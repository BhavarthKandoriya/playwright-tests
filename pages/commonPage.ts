import { Page } from '@playwright/test';
import { PlaywrightActions } from '../utilities/playwrightActions';
import { PlaywrightAssertions } from '../utilities/playwrightAssertions';
import { PageObjectManager } from './pageObjectManager';

export class CommonPage {
  readonly page: Page;
  readonly projectName: string;
  readonly loginLink: string = '#login2';
  readonly cartLink: string = '#cartur';
  playwrightActions: PlaywrightActions;
  playwrightAssertions: PlaywrightAssertions;

  constructor(page: Page, projectName: string) {
    this.playwrightActions = new PlaywrightActions(page);
    this.playwrightAssertions = new PlaywrightAssertions(page);
    this.page = page;
    this.projectName = projectName;
  }

  async navigateToUrl(url = '/') {
    await this.playwrightActions.visit(url);
  }

  async clickLogInLink(poManager: PageObjectManager){
    await this.playwrightActions.findAndClick(this.loginLink);
    return poManager.getLoginPage();
  }

  async clickCartLink(poManager: PageObjectManager){
    await this.playwrightActions.findAndClick(this.cartLink);
    return poManager.getCartPage();
  }
  
}