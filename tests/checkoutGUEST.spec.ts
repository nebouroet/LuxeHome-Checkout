import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ProductPage} from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout flow for guest users validation', () => {
    
let productPage: ProductPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

test.beforeEach( async ({ page }) => {
    
productPage = new ProductPage(page);
cartPage = new CartPage(page);
checkoutPage = new CheckoutPage(page);     

await page.goto('https://daristr.github.io/luxehome-qa/#/');
await productPage.shopNowBtn.click();
await productPage.openProduct('Nordic Comfort Sofa in light');
await productPage.addToCart();
await productPage.cartNav.click();
await cartPage.checkout();
});

test('Guest user can fill out the checkout form and place the order', async ({ page }) => {

    const checkoutPage = new CheckoutPage(page);

        await page.goto('https://daristr.github.io/luxehome-qa/#/checkout');
        const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const phoneNumber = faker.string.numeric(10); 
    const streetAddress = faker.location.streetAddress();
    const city = faker.location.city();
    const zipCode = faker.location.zipCode('#####')

     await checkoutPage.fillContactInfo(firstName, lastName, phoneNumber);
     await checkoutPage.fillShippingInfo(streetAddress, city, zipCode);
     await checkoutPage.selectCountry('United States');
     await checkoutPage.selectState('California');
     await checkoutPage.checkShippingMethod('radio-shipping-express');
     

     const cardName = `${firstName} ${lastName}`;
    const cardNumber = faker.finance.creditCardNumber('visa'); 
    const cvv = faker.finance.creditCardCVV();

     await checkoutPage.fillPaymentInfo(cardName, cardNumber, '12/34', cvv);

     await checkoutPage.placeOrderBtn.click()

    await expect(page.getByRole('heading', { name: 'Order Confirmed!' })).toBeVisible();
    }) 
})