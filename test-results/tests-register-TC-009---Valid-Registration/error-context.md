# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\register.spec.js >> TC_009 - Valid Registration
- Location: tests\register.spec.js:61:1

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /login\.html/
Received string:  "http://127.0.0.1:5500/frontend/register.html"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × unexpected value "http://127.0.0.1:5500/frontend/register.html"

```

```yaml
- heading "Create Account" [level=2]
- textbox "Full Name": Sakthi
- textbox "Email": sakthiveeeluumuthusamy620@gmail.com
- textbox "Password": "123456"
- textbox "Confirm Password": "123456"
- button "Register"
- paragraph:
  - text: Already have an account?
  - link "Login":
    - /url: login.html
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | const URL = 'http://127.0.0.1:5500/frontend/register.html';
  4   | 
  5   | test.beforeEach(async ({ page }) => {
  6   |     await page.goto(URL);
  7   | });
  8   | 
  9   | // TC_001 - Register page loaded
  10  | test('TC_001 - Register page loaded', async ({ page }) => {
  11  |     await expect(page).toHaveTitle(/Register/i);
  12  | });
  13  | 
  14  | // TC_002 - Full Name field visible
  15  | test('TC_002 - Full Name field visible', async ({ page }) => {
  16  |     await expect(page.locator('#fullname')).toBeVisible();
  17  | });
  18  | 
  19  | // TC_003 - Email field visible
  20  | test('TC_003 - Email field visible', async ({ page }) => {
  21  |     await expect(page.locator('#email')).toBeVisible();
  22  | });
  23  | 
  24  | // TC_004 - Password field visible
  25  | test('TC_004 - Password field visible', async ({ page }) => {
  26  |     await expect(page.locator('#password')).toBeVisible();
  27  | });
  28  | 
  29  | // TC_005 - Confirm Password field visible
  30  | test('TC_005 - Confirm Password field visible', async ({ page }) => {
  31  |     await expect(page.locator('#confirmPassword')).toBeVisible();
  32  | });
  33  | 
  34  | // TC_006 - Register button visible
  35  | test('TC_006 - Register button visible', async ({ page }) => {
  36  |     await expect(page.locator('button')).toContainText('Register');
  37  | });
  38  | 
  39  | // TC_007 - Login link visible
  40  | test('TC_007 - Login link visible', async ({ page }) => {
  41  |     await expect(page.locator('a')).toContainText('Login');
  42  | });
  43  | 
  44  | // TC_008 - Password mismatch
  45  | test('TC_008 - Password Mismatch', async ({ page }) => {
  46  | 
  47  |     page.on('dialog', async dialog => {
  48  |         expect(dialog.message()).toContain('Password');
  49  |         await dialog.accept();
  50  |     });
  51  | 
  52  |     await page.fill('#fullname', 'Sakthi');
  53  |     await page.fill('#email', 'sakthi@test.com');
  54  |     await page.fill('#password', '123456');
  55  |     await page.fill('#confirmPassword', '654321');
  56  | 
  57  |     await page.click('button');
  58  | });
  59  | 
  60  | // TC_009 - Successful Registration
  61  | test('TC_009 - Valid Registration', async ({ page }) => {
  62  | 
  63  |     await page.goto('http://127.0.0.1:5500/frontend/register.html');
  64  | 
  65  |     await page.fill('#fullname', 'Sakthi');
  66  | 
  67  |     await page.fill('#email', 'sakthiveeeluumuthusamy620@gmail.com');
  68  | 
  69  |     await page.fill('#password', '123456');
  70  | 
  71  |     // 🔥 Missing line
  72  |     await page.fill('#confirmPassword', '123456');
  73  | 
  74  | 
  75  |     page.on('dialog', async dialog => {
  76  |         console.log(dialog.message());
  77  |         await dialog.accept();
  78  |     });
  79  | 
  80  | 
  81  |     await page.click('button');
  82  | 
  83  |     await page.waitForTimeout(3000);
  84  | 
> 85  |     await expect(page).toHaveURL(/login\.html/);
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  86  | 
  87  | });
  88  | 
  89  | // TC_010 - Required field validation
  90  | test('TC_010 - Empty Form', async ({ page }) => {
  91  | 
  92  |     await page.click('button');
  93  | 
  94  |     const fullname = page.locator('#fullname');
  95  | 
  96  |     await expect(fullname).toHaveAttribute('required', '');
  97  | });
  98  | // TC_011 - Invalid Email Format
  99  | test('TC_011 - Invalid Email Format', async ({page}) => {
  100 | 
  101 |     await page.goto('http://127.0.0.1:5500/frontend/register.html');
  102 | 
  103 |     await page.fill('#fullname','Sakthi');
  104 |     await page.fill('#email','sakthi@');
  105 |     await page.fill('#password','123456');
  106 |     await page.fill('#confirmPassword','123456');
  107 | 
  108 |     await page.click('button');
  109 | 
  110 |     await expect(page).toHaveURL(/register.html/);
  111 | 
  112 | });
  113 | 
  114 | 
  115 | // TC_012 - Password Less Than Minimum Length
  116 | test('TC_012 - Short Password Validation', async ({page}) => {
  117 | 
  118 |     await page.goto('http://127.0.0.1:5500/frontend/register.html');
  119 | 
  120 |     await page.fill('#fullname','Sakthi');
  121 |     await page.fill('#email','test@gmail.com');
  122 |     await page.fill('#password','123');
  123 |     await page.fill('#confirmPassword','123');
  124 | 
  125 |     await page.click('button');
  126 | 
  127 |     await expect(page).toHaveURL(/register.html/);
  128 | 
  129 | });
  130 | 
  131 | 
  132 | // TC_013 - Password With Spaces
  133 | test('TC_013 - Password Contains Spaces', async ({page}) => {
  134 | 
  135 |    await page.goto('http://127.0.0.1:5500/frontend/register.html');
  136 | 
  137 |     await page.fill('#fullname','Sakthi');
  138 |     await page.fill('#email','test@gmail.com');
  139 |     await page.fill('#password','123 456');
  140 |     await page.fill('#confirmPassword','123 456');
  141 | 
  142 |     await page.click('button');
  143 | 
  144 | });
  145 | 
  146 | 
  147 | // TC_014 - Empty Full Name
  148 | test('TC_014 - Empty Full Name Field', async ({page}) => {
  149 | 
  150 |     await page.goto('http://127.0.0.1:5500/frontend/register.html');
  151 | 
  152 |     await page.fill('#email','test@gmail.com');
  153 |     await page.fill('#password','123456');
  154 |     await page.fill('#confirmPassword','123456');
  155 | 
  156 |     await page.click('button');
  157 | 
  158 |     await expect(page.locator('#fullname')).toBeEmpty();
  159 | 
  160 | });
  161 | 
  162 | 
  163 | // TC_015 - Duplicate Email Registration
  164 | test('TC_015 - Duplicate Email', async ({page}) => {
  165 | 
  166 | await page.goto('http://127.0.0.1:5500/frontend/register.html');
  167 | 
  168 |     await page.fill('#fullname','Sakthi');
  169 | 
  170 |     await page.fill('#email','sakthivel@gmail.com');
  171 | 
  172 |     await page.fill('#password','123456');
  173 | 
  174 |     await page.fill('#confirmPassword','123456');
  175 | 
  176 | 
  177 |     page.on('dialog', async dialog=>{
  178 |         console.log(dialog.message());
  179 |         await dialog.accept();
  180 |     });
  181 | 
  182 | 
  183 |     await page.click('button');
  184 | 
  185 | });
```