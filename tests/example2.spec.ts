import {test, expect} from "@playwright/test";

test.skip ("Check page title", async ({page}) => {
    await page.goto("http://example.com/");
    const pageTitle = page.locator("h1");
    await expect(pageTitle).toContainText("Example Domain");
    });

    test ("Клики", async ({page}) => {
        await page.goto("https://myretro-stg.tochkavhoda.ru/");
        await page.click(".signin");
        await page.click(".button-login");
        const errorMessage = page.locator("text=Error: Authentication failed: Wrong login or password");
        await expect(errorMessage).toContainText("Error: Authentication failed: Wrong login or password");
    });

    test.describe ("Первый тестовый набор", () => {
    test.beforeEach (async ({page}) => {
        await page.goto("https://myretro-stg.tochkavhoda.ru/");
    });
        test ("Ввод данных", async ({page}) => {
            //await page.goto("https://myretro-stg.tochkavhoda.ru/");
            await page.click(".signin");
            await page.type("#email", "wrong email");
            await page.type("#password", "wrong password");
            await page.click(".button-login");
            const errorMessage = page.locator("text=Error: Authentication failed: Wrong login or password");
            await expect(errorMessage).toContainText("Error: Authentication failed: Wrong login or password");
        });
    
        test ("Ассерты", async ({page}) => {
            //await page.goto("https://myretro-stg.tochkavhoda.ru/");
            await expect(page).toHaveURL("https://myretro-stg.tochkavhoda.ru/");
            await expect(page).toHaveTitle("MyRetro");
            const logo = page.locator(".logo");
            await expect(logo).toBeVisible()
            await expect(logo).toHaveText("MyRetro");
            const signInDialog = page.locator(".dialog");
            await expect(signInDialog).not.toBeVisible();
            });
    });
    
            
    test ("Смена языка на русский", async ({page}) => {
        await page.goto("https://myretro-stg.tochkavhoda.ru/");
        await page.click ('[data-testid="lang-switcher-to-ru"]');
        const sing = page.locator("text=Войти");
        await expect(sing).toContainText("Войти");
    });
    