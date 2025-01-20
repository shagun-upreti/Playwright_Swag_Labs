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

    


    test('Validate sorting Price(high to low',async()=>
    {
        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveTitle("Swag Labs");

        await page.locator('.product_sort_container').selectOption('hilo');

        const productPrices = page.locator('.inventory_item_price');

        await expect(productPrices.nth(0)).toContainText('49.99');

        await expect(productPrices.nth(5)).toContainText('7.99');
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


    test('Navigation bar redirections: All Items',async()=>
    {
        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveTitle("Swag Labs");

        const productTitle = await page.getByText('Sauce Labs Backpack');

        await productTitle.click();

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory-item.html?id=4");

        const menuButton = await page.locator('#react-burger-menu-btn');

        await menuButton.click();

        const allItemsBtn = await page.locator("#inventory_sidebar_link");

        await allItemsBtn.click();

        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

        const productItem = await page.locator("(//div[@class='inventory_item'])");

        await expect(productItem).toHaveCount(6);

    })



    test('Navigation bar redirections: About',async()=>
    {
        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveTitle("Swag Labs");

        const menuButton = await page.locator('#react-burger-menu-btn');

        await menuButton.click();

        const aboutBtn = await page.locator("#about_sidebar_link");

        await aboutBtn.click();

        await expect(page).toHaveTitle('Sauce Labs: Cross Browser Testing, Selenium Testing & Mobile Testing');
    })


    test('Navigation bar redirections: Logout', async()=>
    {
        await login(page, 'standard_user', 'secret_sauce');

        await expect(page).toHaveTitle("Swag Labs");

        const menuButton = await page.locator('#react-burger-menu-btn');

        await menuButton.click();

        const logoutBtn = await page.locator("#logout_sidebar_link");

        await logoutBtn.click();

        await expect(page).toHaveURL("https://www.saucedemo.com/");
    })



    test('Navigation bar redirections: Reset App State', async()=>
        {
            await login(page, 'standard_user', 'secret_sauce');
    
            await expect(page).toHaveTitle("Swag Labs");

            const cartItem = await page.locator('.shopping_cart_badge');

            await expect(cartItem).not.toBeVisible();

            const addToCart = await page.locator("#add-to-cart-sauce-labs-backpack");
           
            await addToCart.click();

            await expect(cartItem).toBeVisible();

            await expect(cartItem).toHaveCount(1);
    
            const menuButton = await page.locator('#react-burger-menu-btn');
    
            await menuButton.click();
    
            const resetBtn = await page.locator("#reset_sidebar_link");
    
            await resetBtn.click();
    
            await expect(cartItem).not.toBeVisible();
        })


        test('Navigating to cart page by clicking on the cart icon', async()=>
            {
                await login(page, 'standard_user', 'secret_sauce');
        
                await expect(page).toHaveTitle("Swag Labs");
        
                const cart= await page.locator('.shopping_cart_link');

                await cart.click();

                await page.waitForTimeout(2000);

                await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
            })

            test.afterEach(async() =>
            {
                await page.close();

                await context.close();
            })
})