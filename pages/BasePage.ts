import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly signInNav: Locator;
  readonly cartNav: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInNav = page.getByTestId('btn-nav-signin');
    this.cartNav = page.getByTestId('btn-nav-cart');
    this.logo = page.getByTestId('logo');
  }

  async goToSignIn() {
    await this.signInNav.click();
  }
}