import { baseUrl } from './url';

export async function login(page, username, password) {

    await page.goto(baseUrl);

    const usernameField = page.getByPlaceholder("Username");

    await usernameField.click();

    await usernameField.fill(username);

    const passwordField = page.getByPlaceholder("Password");

    await passwordField.click();

    await passwordField.fill(password);

    const loginBtn = page.locator("#login-button");
    
    await loginBtn.click();
}

export async function navigateToProductPage(page, username, password){

    await login(page, username, password);

    await page.getByText('Sauce Labs Backpack').click();
}