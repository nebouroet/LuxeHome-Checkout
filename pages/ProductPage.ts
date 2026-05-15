import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly shopNowBtn = this.page.getByTestId('btn-shop-now');
  readonly addToCartBtn = this.page.getByTestId('btn-add-to-cart');

  async openProduct(productName: string) {
    await this.page.getByRole('img', { name: productName }).click();
  }

  async addToCart() {
    await this.addToCartBtn.click();
  }
}