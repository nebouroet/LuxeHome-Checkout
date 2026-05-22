import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import {CheckoutPage} from '../pages/CheckoutPage';
    

test.describe ('Checkout flow for registered users validation', () => {


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

    test('RegisteredUser can fill out the checkout form and place an order', async ({ page }) => {

    

        const checkoutPage = new CheckoutPage(page);

        await page.goto('https://daristr.github.io/luxehome-qa/#/checkout');

     await checkoutPage.fillContactInfo('potato', 'potato', '1234567890');
     await checkoutPage.fillShippingInfo('123 Potato St', 'Potatoville', '12345');
     await checkoutPage.selectCountry('United States');
     await checkoutPage.selectState('California');
     await checkoutPage.checkShippingMethod('radio-shipping-express');
     
     await checkoutPage.fillPaymentInfo('Potato Potato', '4111111111111111', '12/34', '123');

     await checkoutPage.placeOrderBtn.click()

      await expect(page).toHaveURL('https://daristr.github.io/luxehome-qa/#/confirmation');

    }) 
    
    test('should not allow invalid values in required fields', async ({ page }) => {
    // Fill REQUIRED fields with INVALID data

    await checkoutPage.fillContactInfo(
      '12345',        // invalid first name (numbers)
      '@@@###',       // invalid last name (special chars)
      'abcde'         // invalid phone
    );
    await checkoutPage.fillShippingInfo(
      '',             // required address missing
      '12@@city',     // invalid city
      'zip@@'         // invalid zip
    );

    await checkoutPage.checkShippingMethod('radio-shipping-express');
    await checkoutPage.fillPaymentInfo(
      'John123',            // invalid card name
      '1234',              // invalid card number (too short)
      '99/99',             // invalid expiry date
      '1'                  // invalid cvv
    );

    await checkoutPage.clickPlaceOrder();
    })

    test('should not allow submission of empty checkout form', async ({ page }) => {
    // Try to submit without filling anything
    await checkoutPage.clickPlaceOrder();

    // Assert that success message is NOT shown
    await expect(
      page.getByText(/order placed successfully|thank you for your order/i)
    ).toHaveCount(0);

    // Assert validation errors appear (generic check)
    const requiredFieldErrors = page.getByText(/required|must be|cannot be empty/i);
    await expect(requiredFieldErrors.first()).toBeVisible();
  });

  test('should not submit form when a required field is empty', async ({ page }) => {
    // Fill ONLY partial required data (leave others empty)

    await checkoutPage.fillContactInfo(
      'John',
      '',            // last name empty
      '1234567890'
    );

    await checkoutPage.fillShippingInfo(
      'Street 1',
      'Copenhagen',
      ''             // zip empty
    );
    await checkoutPage.selectCountry('United States');
     await checkoutPage.selectState('California');

    await checkoutPage.checkShippingMethod('radio-shipping-standard');
    
    await checkoutPage.fillPaymentInfo(
      'John Doe',
      '',            // card number empty
      '12/30',
      '123'
    );

    await checkoutPage.clickPlaceOrder();

    // Assert order is NOT placed
    await expect(
      page.getByText(/order placed successfully|thank you for your order/i)
    ).toHaveCount(0);

    // Assert validation errors appear
    const errorMessages = page.getByText(
      /required|cannot be empty|must be filled/i
    );

    await expect(errorMessages.first()).toBeVisible();
  });
})

