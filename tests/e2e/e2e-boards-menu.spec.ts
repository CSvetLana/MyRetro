import { test, expect } from "@playwright/test";
test.describe("Boards menu", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://myretro-stg.tochkavhoda.ru/");
        await page.click(".signin");
        await page.type("#email", "buratino2562");
        await page.type("#password", "111111");
        await page.click(".button-login");
    });
    test("Check Action Items Menu Option", async ({ page }) => {
        await page.click(".hamburger-checkbox");
        await page.getByTestId("action-items-option").click();
        const actionItemsTitle = page.locator("[data-qa=action-items-title]");
        await expect(actionItemsTitle).toHaveText("Action Items");
        await expect(page).toHaveURL("https://myretro-stg.tochkavhoda.ru/action_items");
    });
    test("Check Mentions Menu Option", async ({ page }) => {
        await page.click(".hamburger-checkbox");
        await page.getByTestId("mentions-option").click();
        const mentionsTitle = page.locator("[data-qa=mentions-title]");
        await expect(mentionsTitle).toHaveText("Mentions");
        await expect(page).toHaveURL("https://myretro-stg.tochkavhoda.ru/mentions");
    });
});