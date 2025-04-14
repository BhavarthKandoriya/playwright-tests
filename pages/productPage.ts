import { Page } from '@playwright/test';
import { PlaywrightActions } from '../utilities/playwrightActions';
import { PlaywrightAssertions } from '../utilities/playwrightAssertions';

export class ProductPage {
  readonly page: Page;
  readonly projectName: string;
  readonly productLink: string = '(//div[@id="tbodyid"]//h4/a)[1]';
  playwrightActions: PlaywrightActions;
  playwrightAssertions: PlaywrightAssertions;

  constructor(page: Page, projectName: string) {
    this.playwrightActions = new PlaywrightActions(page);
    this.playwrightAssertions = new PlaywrightAssertions(page);
    this.page = page;
    this.projectName = projectName;
  }

  async openProductDetails(poManager){
    await this.playwrightActions.findAndClick(this.productLink);
    return poManager.getProductDetailsPage();
  }
  
}