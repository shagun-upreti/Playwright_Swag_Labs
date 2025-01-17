import { test, expect } from '@playwright/test';

import { login } from '../Utils/functions';

import { baseUrl, inventoryUrl } from '../Utils/url';

let page, context;

test.describe('test for login', () => {
    test.beforeEach(async ({ browser }) => {

        context = await browser.newContext();

        page = await context.newPage();

    })


    test('successful login', async () => {
        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveURL(inventoryUrl);

        await expect(page).toHaveTitle('Swag Labs');
    })


    test('invalid password login', async () => {
        await login(page, 'standard_user', 'secret_sau');

        //await page.waitForSelector('.error-button');

        const error1 = page.locator('.error-button');

        const errorMsg = page.getByText('Epic sadface: Username and password do not match any user in this service');

        //await expect(error).toBeVisible();

        await expect(errorMsg).toBeVisible();

        await expect(error1).toBeVisible();

        const errorMsgLocator1 = page.locator("h3[data-test='error']");

        const textContent1 = await errorMsgLocator1.textContent();

        console.log(textContent1);

        //await expect(textContent).toHaveText('Epic sadface: Username and password do not match any user in this service');

        const Msg1 = textContent1.includes('Epic sadface: Username and password do not match any user in this service');

        console.log(Msg1);

    })

    test('invalid username', async () => {

        await login(page, 'standard', 'secret_sauce');

        const error2 = page.getByText('Epic sadface: Username and password do not match any user in this service');

        await expect(error2).toBeVisible();
    })


    test('invalid credentials', async () => {
        await login(page, 'standard', 'secret_saucee');

        const error3 = page.getByText('Epic sadface: Username and password do not match any user in this service');

        await expect(error3).toBeVisible();

    })


    test('empty fields', async () => {
        await login(page, '', '');

        const error4 = page.getByText('Epic sadface: Username is required');

        await expect(error4).toBeVisible();
    })



    test('locked out user', async () => {
        await login(page, 'locked_out_user', 'secret_sauce');

        const errorMsgLocator2 = page.locator("h3[data-test='error']");

        const textContent2 = await errorMsgLocator2.textContent();

        const Msg2 = textContent2.includes('Epic sadface: Sorry, this user has been locked out.');

        console.log(Msg2);

    })


    test('problem user', async () => {
        await login(page, 'problem_user', 'secret_sauce');

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

        await expect(page).toHaveTitle("Swag Labs");
    })


    test('performance glitch user', async () => {
        await login(page, 'performance_glitch_user', 'secret_sauce');

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

        await expect(page).toHaveTitle("Swag Labs");
    })


    test('error user', async () => {
        await login(page, 'error_user', 'secret_sauce');

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

        await expect(page).toHaveTitle("Swag Labs");
    })


    test('visual user', async () => {
        await login(page, 'visual_user', 'secret_sauce');

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

        await expect(page).toHaveTitle("Swag Labs");
    })


    test.afterEach(async() =>
    {
        console.log("Test completed");

        await page.close();

        await context.close();
    })
});