import { test, expect } from "@playwright/test";
test.describe("Login and Logout", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://myretro-stg.tochkavhoda.ru/");
    });
    //Negativ test
    test("Login with invalid credentials", async ({ page }) => {
        await page.click(".signin");
        await page.type("#email", "wrong email");
        await page.type("#password", "wrong password");
        await page.click(".button-login");
        const errorMessage = page.locator(
            "text=Error: Authentication failed: Wrong login or password");
        await expect(errorMessage).toContainText(
            "Error: Authentication failed: Wrong login or password");
    });
    //Positiv test
    test("Login with valid credentials", async ({ page }) => {
        await page.click(".signin");
        await page.type("#email", "buratino2562");
        await page.type("#password", "111111");
        await page.click(".button-login");
        const headerTitle = page.locator(".blueprint .header .title");
        await expect(headerTitle).toBeVisible();
        await page.click(".col .logout");
        const singInButton2 = page.locator(".main .signin");
        await expect(singInButton2).toBeVisible();
    });
});