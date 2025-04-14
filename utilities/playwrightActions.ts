/* This file contains methods for all the common UI interactions like Click an element, Type to input, Select from dropdown etc.
Methods will contain the actual implementation of How to find element, How to click an element, How to type into element etc. */
import { BrowserContext, Page } from '@playwright/test';

export class PlaywrightActions {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  //Function to navigate to any page. This can be used with simple callback like visit('https://example.com')
  async visit(url: string) {
    await this.page.goto(url);
  }

  /*Function to find an element and click on it. Use this function by findAndClick('Your selector'). Delay option is also exposed to put some delay between between mousedown and mouseup. 
    This option can be used when click is happening too fast and UI does not able to identify and act on that click event. Refer for more details https://playwright.dev/docs/api/class-page#page-click*/
  async findAndClick(selector: string, delay = 0, force = false) {
    await this.page.locator(selector).click({ delay: delay , force : force});
  }

  //Function to click only if element is visible.
  async findAndClickIfVisible(selector: string) {
    if (await this.page.locator(selector).isVisible()) {
      await this.page.locator(selector).click();
    }
  }

  //Function to upload the files. This option can be used with 2 parameters wher 1st is the selector of the 'choose file' element and 2nd is the filepath.
  async uploadFile(selector: string, filePath: string) {
    await this.page.setInputFiles(selector, filePath);
  }

  async waitForNavigation(selector: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await Promise.all([
      // It is important to call waitForNavigation before click to set up waiting.
      this.page.waitForNavigation(),
      // Clicking the link will indirectly cause a navigation.
      this.findAndClick(selector,500),
    ]);
  }

  /*Optional load state to wait for, defaults to load. If the state has been already reached while loading current document, the method resolves immediately. Can be one of:
      'load' - wait for the load event to be fired.
      'domcontentloaded' - wait for the DOMContentLoaded event to be fired.
      'networkidle' - wait until there are no network connections for at least 500 ms.*/
  async waitForLoadState(event: any){
    await this.page.waitForLoadState(event);
  }

  async waitForTimeout(time: number) {
    await this.page.waitForTimeout(time);
  }

  //Function to find an Select element and also select the value from dropdown. Use this function by simply providing the selector and value to be selected. findAndSelect('Your selector','value')
  async findAndSelect(selector: string, value: string, force = false) {
    await this.page.locator(selector).selectOption({ label: value }, { force: force });
  }

  async findFrameLocatorAndSelect(selector: string, value: string, force = false, frameSelector: string){
    await this.page.frameLocator(frameSelector).locator(selector).selectOption({ label: value }, { force: force });
  }

  async findFrameLocatorAndClick(selector: string, frameSelector: string){
    await this.page.frameLocator(frameSelector).locator(selector).click();
  }

  async findFrameLocatorAndType(selector: string, frameSelector: string, value: string){
    await this.page.frameLocator(frameSelector).locator(selector).fill('');
    await this.page.frameLocator(frameSelector).locator(selector).fill(value);
  }

  //Function to find an element and type to an element. Use this function by findAndType('Your selector','Value')
  async findAndType(selector: string, value: string, type?: string) {
    if(type==='Type'){
      await this.page.locator(selector).type(value,{delay: 500});
      return;
    }
    await this.page.locator(selector).fill('');
    await this.page.locator(selector).fill(value);
  }

  async getElementText(selector: string, frameSelector?: string) {
    if(frameSelector !== undefined){
      return await this.page.frameLocator(frameSelector).locator(selector).textContent();
    }
    return await this.page.locator(selector).textContent();
  }

  //Function to get the attribute value of the element. <input id=name value='Automation account'>. Function can be used to get the value of 'value' attribute here.
  async getAttributeValue(selector: string, attribute: string, frameSelector?: string) {
    if(frameSelector !== undefined){
      return await (await this.getElement(selector,frameSelector)).getAttribute(attribute);
    }
    return await (await this.getElement(selector)).getAttribute(attribute);
  }

  async scrollPage(x: number, y: number) {
    await this.page.evaluate('window.scrollBy(' + x + ',' + y + ')');
  }

  async waitForElementToBeVisible(selector: string) {
    await this.page.locator(selector).waitFor({ state: 'visible' });
  }

  async getVisibleElementsCount(selector: string) {
    return await this.page.locator(selector).count();
  }

  async getElement(selector: string, frameSelector?: string) {
    if(frameSelector !== undefined){
      return this.page.frameLocator(frameSelector).locator(selector);
    }
    return this.page.locator(selector);
  }

  async waitForNewTab(context: BrowserContext){
    return await context.waitForEvent('page');
  }
}