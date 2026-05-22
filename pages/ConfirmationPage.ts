import { Page, Locator } from '@playwright/test';
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

export class ConfirmationPage {
    readonly page: Page;
    readonly orderNumber: Locator;
    readonly confirmationMessage: Locator;

    
    constructor(page: Page) {
        this.page = page;
        this.orderNumber = page.getByTestId('order-number');
        this.confirmationMessage = page.getByTestId('confirmation-message');
    }
async runAccessibilityScan() {
        return new AxeBuilder({ page: this.page })
            .withTags([...WCAG_TAGS])
            .analyze();
    }}