import {test, expect} from '@playwright/test';

import {login} from '../Utils/functions';


let page, context;

test.describe('inventory page scenarios', ()=>
{
    test.beforeEach(async ({browser}) =>
    {
        context = await browser.newContext();

        page = await context.newPage();
    })


    test('Validate total number of products on inventory page', async()=>
    {
        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveTitle("Swag Labs");

        const productItem = await page.locator("(//div[@class='inventory_item'])");

        await expect(productItem).toHaveCount(6);

    })


    test('Validate sorting Name(A to Z)', async()=>
    {
        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveTitle("Swag Labs");
        
        await page.locator('.product_sort_container').selectOption('az');

        const productItem1 = await page.locator("(//div[@class='inventory_item'][1])");

        await expect(productItem1).toContainText('Sauce Labs Backpack');

        const productItem2 = await page.locator("(//div[@class='inventory_item'][6])");

        await expect(productItem2).toContainText('Test.allTheThings() T-Shirt (Red)');


    })


    test('Validate sorting Name(Z to A)', async()=>
        {
            await login(page, 'standard_user', 'secret_sauce');
    
            await expect(page).toHaveTitle("Swag Labs");
            
            await page.locator('.product_sort_container').selectOption('za');
    
            const productItem1 = await page.locator("(//div[@class='inventory_item'][1])");
    
            await expect(productItem1).toContainText('Test.allTheThings() T-Shirt (Red)');
    
            const productItem2 = await page.locator("(//div[@class='inventory_item'][6])");
    
            await expect(productItem2).toContainText('Sauce Labs Backpac');
    
            
        })


    test('Validate sorting Price(low to high)',async()=>
    {

        await login(page, 'standard_user', 'secret_sauce');
    
        await expect(page).toHaveTitle("Swag Labs");

        await page.locator('.product_sort_container').selectOption('lohi');

        const productPrices = page.locator('.inventory_item_price');

        await expect(productPrices.nth(0)).toContainText('7.99');

        await expect(productPrices.nth(5)).toContainText('49.99');
    })

    test('Products text visible on the page', async()=>
    {
        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

        const text = await page.locator('.title');

        await expect(text).toBeVisible();
    })

    test('Hamburger button or menu button  present on top left corner and is clickable', async()=>
    {
        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveTitle("Swag Labs");

        const menuButton = await page.locator('#react-burger-menu-btn');

        await menuButton.click();
    })

})