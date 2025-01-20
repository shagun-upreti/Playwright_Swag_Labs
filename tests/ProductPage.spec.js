import {test, expect} from '@playwright/test';

import {navigateToProductPage} from '../Utils/functions';

import {productPage} from '../Utils/url';

import {username, password} from '../Utils/test-data';

let page, context;

test.describe('set of test cases for individual product page ', () => {
    test.beforeEach(async ({ browser }) => {

        context = await browser.newContext();

        page = await context.newPage();

    })

    test('Navigate to product page', async()=>
    {
        await navigateToProductPage(page, username, password); 
        
        await expect(page).toHaveURL(productPage);
    })


    test('Add to cart',async()=>
    {
        await navigateToProductPage(page, username, password); 

        await expect(page).toHaveURL(productPage);

        const addToCartBtn = await page.locator('#add-to-cart');

        await addToCartBtn.click();

        const removeBtn = await page.locator('#remove');

        await expect(removeBtn).toBeVisible();

        const itemsInCart= await page.locator('.shopping_cart_link');

        await expect(itemsInCart).toBeVisible();

        await expect(itemsInCart).toHaveCount(1);
    })


    test('Back to products',async()=>
    {
        await navigateToProductPage(page, username, password); 
        
        await expect(page).toHaveURL(productPage);

        const backToProducts = await page.locator('#back-to-products');

        await backToProducts.click();

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    })
})

