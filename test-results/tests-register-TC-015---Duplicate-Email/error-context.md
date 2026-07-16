# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\register.spec.js >> TC_015 - Duplicate Email
- Location: tests\register.spec.js:164:1

# Error details

```
Error: dialog.accept: Test ended.
```

# Test source

```ts
  79  | 
  80  | 
  81  |     await page.click('button');
  82  | 
  83  |     await page.waitForTimeout(3000);
  84  | 
  85  |     await expect(page).toHaveURL(/login\.html/);
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
> 179 |         await dialog.accept();
      |                      ^ Error: dialog.accept: Test ended.
  180 |     });
  181 | 
  182 | 
  183 |     await page.click('button');
  184 | 
  185 | });
  186 | 
  187 | 
  188 | // TC_016 - Special Characters in Name
  189 | test('TC_016 - Special Characters Name Validation', async ({page}) => {
  190 | 
  191 |   await page.goto('http://127.0.0.1:5500/frontend/register.html');
  192 | 
  193 |     await page.fill('#fullname','@@@###');
  194 | 
  195 |     await page.fill('#email','test@gmail.com');
  196 | 
  197 |     await page.fill('#password','123456');
  198 | 
  199 |     await page.fill('#confirmPassword','123456');
  200 | 
  201 | 
  202 |     await page.click('button');
  203 | 
  204 | });
  205 | 
  206 | 
  207 | // TC_017 - Confirm Password Wrong
  208 | test('TC_017 - Confirm Password Incorrect', async ({page}) => {
  209 | 
  210 |    await page.goto('http://127.0.0.1:5500/frontend/register.html');
  211 | 
  212 | 
  213 |     await page.fill('#fullname','Sakthi');
  214 | 
  215 |     await page.fill('#email','test@gmail.com');
  216 | 
  217 |     await page.fill('#password','123456');
  218 | 
  219 |     await page.fill('#confirmPassword','654321');
  220 | 
  221 | 
  222 |     page.on('dialog', async dialog=>{
  223 |         expect(dialog.message())
  224 |         .toContain('Password');
  225 |         await dialog.accept();
  226 |     });
  227 | 
  228 | 
  229 |     await page.click('button');
  230 | 
  231 | });
  232 | 
  233 | 
  234 | // TC_018 - Register Button Double Click
  235 | test('TC_018 - Multiple Register Click', async ({page}) => {
  236 | 
  237 |    await page.goto('http://127.0.0.1:5500/frontend/register.html');
  238 | 
  239 |     await page.fill('#fullname','Sakthi');
  240 | 
  241 |     await page.fill('#email',`sakthi${Date.now()}@gmail.com`);
  242 | 
  243 |     await page.fill('#password','123456');
  244 | 
  245 |     await page.fill('#confirmPassword','123456');
  246 | 
  247 | 
  248 |     await page.dblclick('button');
  249 | 
  250 | });
  251 | 
  252 | 
  253 | // TC_019 - Refresh Page Clears Data
  254 | test('TC_019 - Refresh Page Data Clear', async ({page}) => {
  255 | 
  256 |    await page.goto('http://127.0.0.1:5500/frontend/register.html');
  257 | 
  258 |     await page.fill('#fullname','Sakthi');
  259 | 
  260 |     await page.reload();
  261 | 
  262 |     await expect(page.locator('#fullname'))
  263 |     .toBeEmpty();
  264 | 
  265 | });
  266 | 
  267 | 
  268 | // TC_020 - Login Link Navigation
  269 | test('TC_020 - Login Link Click', async ({page}) => {
  270 | 
  271 |    await page.goto('http://127.0.0.1:5500/frontend/register.html');
  272 | 
  273 |     await page.click('text=Login');
  274 | 
  275 |     await expect(page)
  276 |     .toHaveURL(/login.html/);
  277 | 
  278 | });
```