import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly proceedToCheckoutBtn = this.page.getByTestId('btn-proceed-to-checkout');

  async checkout() {
    await this.proceedToCheckoutBtn.click();
  }
}