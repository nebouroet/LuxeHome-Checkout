import { expect, test } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import {CheckoutPage} from '../pages/CheckoutPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';


test.describe('Accessibility Scan Checkout', () => {

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


    test('Checkout page should have no accessibility violations', async ({ page }) => {


        const scanResults = await checkoutPage.runAccessibilityScan();

        if (scanResults.violations.length > 0) {
            console.log(JSON.stringify(scanResults.violations, null, 2));
        }

        expect(scanResults.violations).toEqual([]);
    });

});

test('Confirmation page should have no accessibility violations', async ({ page }) => {

    const confirmationPage = new ConfirmationPage(page);

    await page.goto('https://daristr.github.io/luxehome-qa/#/confirmation');

     const scanResults = await confirmationPage.runAccessibilityScan();

        if (scanResults.violations.length > 0) {
            console.log(JSON.stringify(scanResults.violations, null, 2));
        }

        expect(scanResults.violations).toEqual([]);
    });

