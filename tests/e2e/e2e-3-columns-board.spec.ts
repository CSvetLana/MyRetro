import { test, expect } from "@playwright/test";
test.describe("Work with 3 columns Board", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://myretro-stg.tochkavhoda.ru/");
        await page.click(".signin");
        await page.type("#email", "buratino2562");
        await page.type("#password", "111111N");
        await page.click(".button-login");
        await page.getByTestId("add-new-board").click();
        await page.type("[data-qa=new-board-project-name]", "Test proiect");
        await page.getByTestId("new-board-columns-number").click();
        await page.click("text=- 3 -");
        await page.getByTestId("new-board-column-names").click();
        await page.click("text=- 3 - Good - Bad - Actions");
        await page.getByTestId("start-retro-button").click();
        await expect(page).toHaveURL(/board/);
    });
    test.afterEach(async ({ page }) => {
        await page.goto("/");
        const deleteButton = page.locator(".row.content > div:nth-child(2)").getByText("Delete");
        await deleteButton.click();
        await page.getByRole("button", { name: "Yes" }).click();
    });
    test("Add New Card in Good column", async ({ page }) => {
        await page.getByRole("button", { name: "GOOD" }).click();
        await page.type(".row .content", "test content");
        await page.keyboard.press("Enter");
        const cardContent = page.locator(".row .content");
        await expect(cardContent).toHaveText("test content");
    });
});