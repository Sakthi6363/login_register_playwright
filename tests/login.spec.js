const { test, expect } = require('@playwright/test');

const url = "http://127.0.0.1:5500/frontend/login.html";


// TC_001 - Login Page Loaded
test('TC_001 - Login page loaded', async ({page})=>{

    await page.goto(url);

    await expect(page).toHaveTitle(/Login/);

});


// TC_002 - Email Field Visible
test('TC_002 - Email field visible', async ({page})=>{

    await page.goto(url);

    await expect(page.locator('#email')).toBeVisible();

});


// TC_003 - Password Field Visible
test('TC_003 - Password field visible', async ({page})=>{

    await page.goto(url);

    await expect(page.locator('#password')).toBeVisible();

});


// TC_004 - Login Button Visible
test('TC_004 - Login button visible', async ({page})=>{

    await page.goto(url);

    await expect(page.locator('button')).toBeVisible();

});


// TC_005 - Register Link Visible
test('TC_005 - Register link visible', async ({page})=>{

    await page.goto(url);

    await expect(page.locator('text=Register')).toBeVisible();

});


// TC_006 - Empty Form Submit
test('TC_006 - Empty login form', async ({page})=>{

    await page.goto(url);

    await page.click('button');

});


// TC_007 - Empty Email
test('TC_007 - Empty email validation', async ({page})=>{

    await page.goto(url);

    await page.fill('#password','123456');

    await page.click('button');

});


// TC_008 - Empty Password
test('TC_008 - Empty password validation', async ({page})=>{

    await page.goto(url);

    await page.fill('#email','test@gmail.com');

    await page.click('button');

});


// TC_009 - Invalid Email
test('TC_009 - Valid Registration', async ({page})=>{

await page.goto('http://127.0.0.1:5500/frontend/register.html');

await page.fill('#fullname','Sakthi');

await page.fill('#email',`sakthi${Date.now()}@gmail.com`);

await page.fill('#password','123456');

await page.fill('#confirmPassword','123456');


page.on('dialog', async dialog=>{
    console.log(dialog.message());
    await dialog.accept();
});


await page.click('button');

await page.waitForTimeout(2000);

await expect(page).toHaveURL(/login\.html/);

});

// TC_010 - Invalid Password
test('TC_010 - Invalid password login', async ({page})=>{

    await page.goto(url);

    await page.fill('#email','sakthi@gmail.com');

    await page.fill('#password','wrong123');

    await page.click('button');


});


// TC_011 - Valid Login
test('TC_011 - Valid login', async ({page})=>{

    await page.goto(url);

    await page.fill('#email','f@gmail.com');

    await page.fill('#password','123456');


    await page.click('button');


    await expect(page)
    .toHaveURL(/dashboard.html/);

});


// TC_012 - Email Case Sensitivity
test('TC_012 - Email uppercase test', async ({page})=>{

    await page.goto(url);

    await page.fill('#email','SAKTHI@GMAIL.COM');

    await page.fill('#password','123456');

    await page.click('button');

});


// TC_013 - Password Minimum Length
test('TC_013 - Password Contains Spaces', async ({page})=>{

await page.goto('http://127.0.0.1:5500/frontend/register.html');

await page.fill('#fullname','Sakthi');

await page.fill('#email','test@gmail.com');

await page.fill('#password','123 456');

await page.fill('#confirmPassword','123 456');


page.on('dialog', async dialog=>{
    console.log(dialog.message());
    await dialog.accept();
});


await page.click('button');

});


// TC_014 - Special Character Email
test('TC_014 - Special character email', async ({page})=>{

    await page.goto(url);

    await page.fill('#email','@@@');

    await page.fill('#password','123456');

    await page.click('button');

});


test('TC_015 - Duplicate Email', async ({page})=>{

await page.goto('http://127.0.0.1:5500/frontend/register.html');


page.on('dialog', async dialog=>{

    console.log(dialog.message());

    await dialog.accept();

});


await page.fill('#fullname','Sakthi');

await page.fill('#email','alreadyexist@gmail.com');

await page.fill('#password','123456');

await page.fill('#confirmPassword','123456');


await page.click('button');


});


// TC_016 - Password Masking
test('TC_016 - Password masking', async ({page})=>{

    await page.goto(url);

    await expect(page.locator('#password'))
    .toHaveAttribute('type','password');

});


// TC_017 - Register Navigation
test('TC_017 - Register link navigation', async ({page})=>{

    await page.goto(url);

    await page.click('text=Register');

    await expect(page)
    .toHaveURL(/register.html/);

});


// TC_018 - Refresh Page
test('TC_018 - Refresh login page', async ({page})=>{

    await page.goto(url);

    await page.fill('#email','test@gmail.com');

    await page.reload();

    await expect(page.locator('#email'))
    .toBeEmpty();

});


// TC_019 - Multiple Login Click
test('TC_019 - Double click login', async ({page})=>{

    await page.goto(url);

    await page.fill('#email','test@gmail.com');

    await page.fill('#password','123456');

    await page.dblclick('button');

});


// TC_020 - Dashboard Access Without Login
test('TC_020 - Direct dashboard access', async ({page})=>{

    await page.goto(
    'http://127.0.0.1:5500/frontend/dashboard.html'
    );

    await expect(page)
    .toHaveURL(/dashboard.html/);

});