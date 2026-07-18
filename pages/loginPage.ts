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
    // Add delay before clicking to ensure input is registered
    await this.playwrightActions.findAndClick(this.loginButton, 500);
    // Wait a bit for login response
    await this.page.waitForTimeout(2000);
    // Try to close modal by pressing Escape or clicking close button
    try {
      const closeButton = this.page.locator('[data-dismiss="modal"], .btn-close').first();
      if (await closeButton.isVisible()) {
        await closeButton.click();
      }
    } catch (e) {
      // Ignore if close button not found
    }
    // Press Escape to close modal
    await this.page.press('body', 'Escape');
    return poManager.getProductPage();
  }
  
}