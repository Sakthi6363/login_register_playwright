const { test, expect } = require('@playwright/test');

const URL = 'http://127.0.0.1:5500/frontend/register.html';

test.beforeEach(async ({ page }) => {
    await page.goto(URL);
});

// TC_001 - Register page loaded
test('TC_001 - Register page loaded', async ({ page }) => {
    await expect(page).toHaveTitle(/Register/i);
});

// TC_002 - Full Name field visible
test('TC_002 - Full Name field visible', async ({ page }) => {
    await expect(page.locator('#fullname')).toBeVisible();
});

// TC_003 - Email field visible
test('TC_003 - Email field visible', async ({ page }) => {
    await expect(page.locator('#email')).toBeVisible();
});

// TC_004 - Password field visible
test('TC_004 - Password field visible', async ({ page }) => {
    await expect(page.locator('#password')).toBeVisible();
});

// TC_005 - Confirm Password field visible
test('TC_005 - Confirm Password field visible', async ({ page }) => {
    await expect(page.locator('#confirmPassword')).toBeVisible();
});

// TC_006 - Register button visible
test('TC_006 - Register button visible', async ({ page }) => {
    await expect(page.locator('button')).toContainText('Register');
});

// TC_007 - Login link visible
test('TC_007 - Login link visible', async ({ page }) => {
    await expect(page.locator('a')).toContainText('Login');
});

// TC_008 - Password mismatch
test('TC_008 - Password Mismatch', async ({ page }) => {

    page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Password');
        await dialog.accept();
    });

    await page.fill('#fullname', 'Sakthi');
    await page.fill('#email', 'sakthi@test.com');
    await page.fill('#password', '123456');
    await page.fill('#confirmPassword', '654321');

    await page.click('button');
});

// TC_009 - Successful Registration
test('TC_009 - Valid Registration', async ({ page }) => {

    await page.goto('http://127.0.0.1:5500/frontend/register.html');

    await page.fill('#fullname', 'Sakthi');

    await page.fill('#email', 'sakthiveeeluumuthusamy620@gmail.com');

    await page.fill('#password', '123456');

    // 🔥 Missing line
    await page.fill('#confirmPassword', '123456');


    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept();
    });


    await page.click('button');

    await page.waitForTimeout(3000);

    await expect(page).toHaveURL(/login\.html/);

});

// TC_010 - Required field validation
test('TC_010 - Empty Form', async ({ page }) => {

    await page.click('button');

    const fullname = page.locator('#fullname');

    await expect(fullname).toHaveAttribute('required', '');
});
// TC_011 - Invalid Email Format
test('TC_011 - Invalid Email Format', async ({page}) => {

    await page.goto('http://127.0.0.1:5500/frontend/register.html');

    await page.fill('#fullname','Sakthi');
    await page.fill('#email','sakthi@');
    await page.fill('#password','123456');
    await page.fill('#confirmPassword','123456');

    await page.click('button');

    await expect(page).toHaveURL(/register.html/);

});


// TC_012 - Password Less Than Minimum Length
test('TC_012 - Short Password Validation', async ({page}) => {

    await page.goto('http://127.0.0.1:5500/frontend/register.html');

    await page.fill('#fullname','Sakthi');
    await page.fill('#email','test@gmail.com');
    await page.fill('#password','123');
    await page.fill('#confirmPassword','123');

    await page.click('button');

    await expect(page).toHaveURL(/register.html/);

});


// TC_013 - Password With Spaces
test('TC_013 - Password Contains Spaces', async ({page}) => {

   await page.goto('http://127.0.0.1:5500/frontend/register.html');

    await page.fill('#fullname','Sakthi');
    await page.fill('#email','test@gmail.com');
    await page.fill('#password','123 456');
    await page.fill('#confirmPassword','123 456');

    await page.click('button');

});


// TC_014 - Empty Full Name
test('TC_014 - Empty Full Name Field', async ({page}) => {

    await page.goto('http://127.0.0.1:5500/frontend/register.html');

    await page.fill('#email','test@gmail.com');
    await page.fill('#password','123456');
    await page.fill('#confirmPassword','123456');

    await page.click('button');

    await expect(page.locator('#fullname')).toBeEmpty();

});


// TC_015 - Duplicate Email Registration
test('TC_015 - Duplicate Email', async ({page}) => {

await page.goto('http://127.0.0.1:5500/frontend/register.html');

    await page.fill('#fullname','Sakthi');

    await page.fill('#email','sakthivel@gmail.com');

    await page.fill('#password','123456');

    await page.fill('#confirmPassword','123456');


    page.on('dialog', async dialog=>{
        console.log(dialog.message());
        await dialog.accept();
    });


    await page.click('button');

});


// TC_016 - Special Characters in Name
test('TC_016 - Special Characters Name Validation', async ({page}) => {

  await page.goto('http://127.0.0.1:5500/frontend/register.html');

    await page.fill('#fullname','@@@###');

    await page.fill('#email','test@gmail.com');

    await page.fill('#password','123456');

    await page.fill('#confirmPassword','123456');


    await page.click('button');

});


// TC_017 - Confirm Password Wrong
test('TC_017 - Confirm Password Incorrect', async ({page}) => {

   await page.goto('http://127.0.0.1:5500/frontend/register.html');


    await page.fill('#fullname','Sakthi');

    await page.fill('#email','test@gmail.com');

    await page.fill('#password','123456');

    await page.fill('#confirmPassword','654321');


    page.on('dialog', async dialog=>{
        expect(dialog.message())
        .toContain('Password');
        await dialog.accept();
    });


    await page.click('button');

});


// TC_018 - Register Button Double Click
test('TC_018 - Multiple Register Click', async ({page}) => {

   await page.goto('http://127.0.0.1:5500/frontend/register.html');

    await page.fill('#fullname','Sakthi');

    await page.fill('#email',`sakthi${Date.now()}@gmail.com`);

    await page.fill('#password','123456');

    await page.fill('#confirmPassword','123456');


    await page.dblclick('button');

});


// TC_019 - Refresh Page Clears Data
test('TC_019 - Refresh Page Data Clear', async ({page}) => {

   await page.goto('http://127.0.0.1:5500/frontend/register.html');

    await page.fill('#fullname','Sakthi');

    await page.reload();

    await expect(page.locator('#fullname'))
    .toBeEmpty();

});


// TC_020 - Login Link Navigation
test('TC_020 - Login Link Click', async ({page}) => {

   await page.goto('http://127.0.0.1:5500/frontend/register.html');

    await page.click('text=Login');

    await expect(page)
    .toHaveURL(/login.html/);

});