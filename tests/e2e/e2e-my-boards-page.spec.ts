import { test, expect } from "@playwright/test";
test.describe("My Boards Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://myretro-stg.tochkavhoda.ru/");
        await page.click(".signin");
        await page.type("#email", "buratino2562");
        await page.type("#password", "111111");
        await page.click(".button-login");
    });
    test("Create New Board with 3 columns", async ({ page }) => {
        await page.getByTestId("add-new-board").click();
        await page.type("[data-qa=new-board-project-name]", "Test proiect");
        await page.getByTestId("new-board-columns-number").click();
        await page.click("text=- 3 -");
        await page.getByTestId("new-board-column-names").click();
        await page.click("text=- 3 - Good - Bad - Actions");
        await page.getByTestId("start-retro-button").click();
        const boardTitle = page.locator("[data-qa=board-project-title]");
        await expect(boardTitle).toHaveText("Test proiect");
        await expect(page).toHaveURL(/board/);
    });
    test("Create New Board with 4 columns", async ({ page }) => {
        await page.getByTestId("add-new-board").click();
        await page.type("[data-qa=new-board-project-name]", "Test proiect_4");
        await page.getByTestId("new-board-columns-number").click();
        await page.click("text=- 4 -");
        await page.getByTestId("new-board-column-names").click();
        await page.click("text=- 4 - Good - Bad - Keep - Actions");
        await page.getByTestId("start-retro-button").click();
        const boardTitle = page.locator("[data-qa=board-project-title]");
        await expect(boardTitle).toHaveText("Test proiect_4");
        await expect(page).toHaveURL(/board/);
    });
});