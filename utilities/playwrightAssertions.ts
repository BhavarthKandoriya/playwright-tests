import { expect, Locator, Page } from '@playwright/test';
import * as fs from 'fs';

export class PlaywrightAssertions {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  //This function will find the locatior and Ensures the Locator points to an element with the given text.
  async matchWithElementText(selector: string, matchValue: string) {
    await expect(this.page.locator(selector)).toHaveText(matchValue);
  }

  //This function will validate that the current page contains the given URL.
  async toHaveURL(currentPage: Page, url: any){
    await expect(currentPage).toHaveURL(url);
  }

  async toEqual(actual: string, expected: string){
    expect(actual).toEqual(expected);
  }

  //This function will validate that the current page contains the given Title.
  async toHaveTitle(currentPage: Page, title: any){
    await expect(currentPage).toHaveTitle(title);
  }

  //This function ensures the Locator points to an element with the given input value. You can use regular expressions for the value as well.
  async toHaveValue(selector: string, value: string){
    await expect(this.page.locator(selector)).toHaveValue(value);
  }

  async toBeChecked(locator: Locator){
    await expect(locator).toBeChecked();
  }

  //This function will validate that the element text does not match with the given text.
  async notMatchWithElementText(selector: string, matchValue: string) {
    await expect(this.page.locator(selector)).not.toHaveText(matchValue);
  }

  async notInViewPort(selector: string){
    await expect(this.page.locator(selector)).not.toBeInViewport();
  }

  async inViewPort(selector: string){
    await expect(this.page.locator(selector)).toBeInViewport();
  }

  async toBeGreaterThan(actualCount: number, expectedCount: number) {
    expect(actualCount).toBeGreaterThan(expectedCount);
  }

  async matchWithElementCount(selector: string, matchCount: number) {
    await expect(this.page.locator(selector)).toHaveCount(matchCount);
  }

  async toHaveAttribute(selector: string, attribute: string, value: string){
    await expect(this.page.locator(selector)).toHaveAttribute(attribute, value);
  }

  async verifyElementToBeVisible(selector: string) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async verifyElementToBeHidden(selector: string){
    await expect(this.page.locator(selector)).toBeHidden();
  }

  async elementContainsText(selector: string, matchValue: string) {
    await expect(this.page.locator(selector)).toContainText(matchValue);
  }

  //Function to verify that file exist on the provided path.
  async verifyFile(path: string){
    expect(fs.existsSync(path)).toBeTruthy();
  }

}