import { test } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test('User can register and checkout a product', async ({ page }) => {
  const auth = new AuthPage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await page.goto('https://daristr.github.io/luxehome-qa/#/');
  await auth.goToSignIn();
  await auth.register('potato potato', 'potato@gmail.com', 'potato');

  await product.shopNowBtn.click();
  await product.openProduct('Nordic Comfort Sofa in light');
  await product.addToCart();

  
  await product.cartNav.click();
  await cart.checkout();
});