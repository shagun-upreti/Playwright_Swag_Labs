import { test, expect } from '@playwright/test';

import { login } from '..//Utils/functions';

import { username, password } from '..//Utils/test-data';

import { inventoryUrl } from '../Utils/url';

let page, context;

test.describe('checkout scenarios', () => {
    test.beforeEach(async ({ browser }) => {
        context = await browser.newContext();

        page = await browser.newPage();
    })


    test('successful checkout flow', async () => {
        await login(page, username, password);

        await expect(page).toHaveTitle('Swag Labs');

        const sauceLabsBackpack = page.locator('#add-to-cart-sauce-labs-backpack');

        await sauceLabsBackpack.click();

        const sauceLabsBikeLight = page.locator('#add-to-cart-sauce-labs-bike-light');

        await sauceLabsBikeLight.click();

        const cartButton = page.locator("//a[@class='shopping_cart_link']");

        await cartButton.click();

        const sauceBackpack = page.getByText('Sauce Labs Backpack');

        await expect(sauceBackpack).toBeVisible();

        const sauceBikeLight = page.getByText('Sauce Labs Bike Light');

        await expect(sauceBikeLight).toBeVisible();

        const checkout = page.locator('#checkout');

        await checkout.click();





        //checkout: Your Information

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

        await page.locator('#continue').click();

        const firstNameError = page.getByText('Error: First Name is required');

        await expect(firstNameError).toBeVisible();

        await page.getByPlaceholder('First Name').fill('Shagun');

        await page.locator('#continue').click();

        const lastNameError = page.getByText('Error: Last Name is required');

        await expect(lastNameError).toBeVisible();

        await page.getByPlaceholder('Last Name').fill('Upreti');

        await page.locator('#continue').click();

        const zipError = page.getByText('Error: Postal Code is required');

        await expect(zipError).toBeVisible();

        await page.getByPlaceholder('Zip/Postal Code').fill('455585');

        await page.locator('#continue').click();

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

        await expect(sauceBackpack).toBeVisible();

        await expect(sauceBikeLight).toBeVisible();

        const price1 = page.getByText('$29.99');

        const text1 = await price1.textContent();

        const price2 = page.getByText('$9.99');

        const text2 = await price2.textContent();

        const num1   = parseFloat(text1.replace("$", ""));

        const num2 = parseFloat(text2.replace("$", ""));

        const total = num1 + num2;

        console.log(`Total: $${total.toFixed(2)}`);

        const itemTotal = page.getByText('Item total: $39.98');

        const text3 = await itemTotal.textContent();

        const num3 = parseFloat(text3.replace("Item total: $","").trim());

        console.log(num3);

        expect(num3).toBeCloseTo(total,2);

        






    })


})