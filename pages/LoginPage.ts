import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    readonly loginEmailInput = this.page.getByTestId('input-login-email');
    readonly passwordInput = this.page.getByTestId('input-login-password');
    readonly SignInBtn = this.page.getByTestId('btn-login-submit');

    async Login (email: 'nebouroet@email.com', pass: '123456') {
        await this.goToLogin();
        await this.loginEmailInput.fill( email );
        await this.passwordInput.fill( pass );
        await this.SignInBtn.click();



































    }}