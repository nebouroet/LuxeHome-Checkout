import {Locator, Page, expect} from '@playwright/test';
import { faker } from '@faker-js/faker';
import AxeBuilder from '@axe-core/playwright';

const WCAG_TAGS = [
    'wcag2a', 
    'wcag2aa',
     'wcag22a',
      'wcag22aa',
       'contrast',
        'focus-visible',
         'heading-order',
          'best-practice',
            'en-301-549',
             'aria',
              'keyboard',
              'image-alt',
        ] as const;

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly phoneInput: Locator;
    readonly countrySelect: Locator;
    readonly addressInput: Locator;
    readonly cityInput: Locator;
    readonly zipInput: Locator;
    readonly stateSelect: Locator;
    readonly shippingMethodSelect: Locator;
    readonly cardNameInput: Locator;
    readonly cardNumberInput: Locator;
    readonly expiryInput: Locator;
    readonly cvvInput: Locator;
    readonly placeOrderBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByTestId('input-first-name');
        this.lastNameInput = page.getByTestId('input-last-name');
        this.phoneInput = page.getByTestId('input-phone');
        this.countrySelect = page.getByTestId('select-country');
        this.addressInput = page.getByTestId('input-address');
        this.cityInput = page.getByTestId('input-city');
        this.zipInput = page.getByTestId('input-zip');
        this.stateSelect = page.getByTestId('select-state');
        this.shippingMethodSelect = page.getByTestId('select-shipping-method');
        this.cardNameInput = page.getByTestId('input-card-name');
        this.cardNumberInput = page.getByTestId('input-card-number');
        this.expiryInput = page.getByTestId('input-expiry');
        this.cvvInput = page.getByTestId('input-cvv');
        this.placeOrderBtn = page.getByTestId('btn-place-order');
    }
    async runAccessibilityScan() {
        return new AxeBuilder({ page: this.page })
            .withTags([...WCAG_TAGS])
            .analyze();
    }
    async fillContactInfo( firstName: string, lastName: string, phone: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.phoneInput.fill(phone);
    }

    async fillShippingInfo( address: string, city: string, zip: string) {
        await this.addressInput.fill(address);
        await this.cityInput.fill(city);
        await this.zipInput.fill(zip);
    }
    async selectCountry(country: string) {
    await this.countrySelect.selectOption({ label: country });
}

async selectState(state: string) {
    await this.stateSelect.selectOption({ label: state });
}
    async checkShippingMethod(option: string) {
        await this.page.getByTestId(option).click();
    }

    async fillPaymentInfo( cardName: string, cardNumber: string, expiry: string, cvv: string)  {
        await this.cardNameInput.fill(cardName);
        await this.cardNumberInput.fill(cardNumber);
        await this.expiryInput.fill(expiry);
        await this.cvvInput.fill(cvv);
    }
    async clickPlaceOrder() {
        await this.placeOrderBtn.click();
    }
}

