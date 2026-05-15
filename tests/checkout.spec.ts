import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import {CheckoutPage} from '../pages/CheckoutPage';
    

test.describe ('Checkout flow for logged-in users validation', () => {

    let authPage: AuthPage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {

    authPage = new AuthPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await page.goto('https://daristr.github.io/luxehome-qa/#/');

     await authPage.goToSignIn();
        await authPage.register ('potato potato', 'potato@potato.com', 'potato');
        await productPage.shopNowBtn.click();
        await productPage.openProduct('Nordic Comfort Sofa in light');
        await productPage.addToCart();
        await productPage.cartNav.click();
        await cartPage.checkout();
  });

    test('User can fill out the checkout form and place an order', async ({ page }) => {

    

        const checkoutPage = new CheckoutPage(page);

        await page.goto('https://daristr.github.io/luxehome-qa/#/checkout');

     await checkoutPage.fillContactInfo('potato', 'potato', '1234567890');
     await checkoutPage.fillShippingInfo('123 Potato St', 'Potatoville', '12345');
     await checkoutPage.selectCountry('United States');
     await checkoutPage.selectState('California');
     await checkoutPage.checkShippingMethod('radio-shipping-express');
     
     await checkoutPage.fillPaymentInfo('Potato Potato', '4111111111111111', '12/34', '123');

     await checkoutPage.placeOrderBtn.click()

    }) 
})
