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
    // Close login modal after login attempt by pressing Escape
    await this.page.press('body', 'Escape');
    // Wait for modal to be hidden
    await this.page.locator('[aria-labelledby="logInModalLabel"]').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    return poManager.getProductPage();
  }
  
}