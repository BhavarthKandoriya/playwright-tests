import { Page } from '@playwright/test';
import { PlaywrightActions } from '../utilities/playwrightActions';
import { PlaywrightAssertions } from '../utilities/playwrightAssertions';

export class LoginPage {
  readonly page: Page;
  readonly projectName: string;
  readonly loginButton: string = '//button[text()="Log in"]';
  readonly usernameInput: string = '#loginusername';
  readonly passwordInput: string = '#loginpassword';
  readonly logoutLink: string = '#logout2';
  playwrightActions: PlaywrightActions;
  playwrightAssertions: PlaywrightAssertions;

  constructor(page: Page, projectName: string) {
    this.playwrightActions = new PlaywrightActions(page);
    this.playwrightAssertions = new PlaywrightAssertions(page);
    this.page = page;
    this.projectName = projectName;
  }

  async accountLogin(poManager, username, password){
    await this.playwrightActions.findAndType(this.usernameInput, username);
    await this.playwrightActions.findAndType(this.passwordInput, password);
    await this.playwrightActions.findAndClick(this.loginButton);
    await this.playwrightAssertions.inViewPort(this.logoutLink);
    return poManager.getProductPage();
  }
  
}