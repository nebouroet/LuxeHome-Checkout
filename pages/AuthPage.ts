import { BasePage } from './BasePage';

export class AuthPage extends BasePage {
  // Registration Locators
  readonly goToRegisterLink = this.page.getByTestId('link-go-to-register');
  readonly nameInput = this.page.getByTestId('input-register-name');
  readonly emailInput = this.page.getByTestId('input-register-email');
  readonly passwordInput = this.page.getByTestId('input-register-password');
  readonly confirmPasswordInput = this.page.getByTestId('input-register-confirm-password');
  readonly registerSubmitBtn = this.page.getByTestId('btn-register-submit');

  async register(name: string, email: string, pass: string) {
    await this.goToRegisterLink.click();
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.confirmPasswordInput.fill(pass);
    await this.registerSubmitBtn.click();
  }
}