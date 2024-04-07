import { test, expect } from "@playwright/test";
let oldPhoneNumber;
let oldFirstName;
let oldLastName;

//let oldBirthdayDate;
test.describe("User Profile", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://myretro-stg.tochkavhoda.ru/");
        await page.click(".signin");
        await page.type("#email", "buratino2562");
        await page.type("#password", "111111");
        await page.click(".button-login");
    });
    test("Change First Name and Cancel", async ({ page }) => {
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");
        const firstNameField = page.locator("#first-name");
        await firstNameField.fill("Cancel First name");
        await page.click("[data-qa=profile-cancel-button]");
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");
        await expect(firstNameField).not.toHaveValue("Cancel First name");
    });
    test("Change First Name and Submit", async ({ page }) => {
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");
        const firstNameField = page.locator("#first-name");
        oldFirstName = await firstNameField.inputValue();
        console.log(oldFirstName);
        await firstNameField.fill("Submit First name");
        await page.click("[data-qa=profile-submit-button]");
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");
        await expect(firstNameField).toHaveValue("Submit First name");
    });
    test("Check Email Field", async ({ page }) => {
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");
        const email = page.locator("#email");
        await expect(email).toHaveValue("buratino2562@mail.ru");
    });
    test("Change Position and Submit", async ({ page }) => {
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");
        await page.click(".md-select-value[name=position-id]");
        await page.getByRole('button', { name: 'project manager' }).click();
        await page.click("[data-qa=profile-submit-button]");
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");
        const position = page.locator(".md-select-value[name=position-id]");
        await expect(position).toHaveValue("project manager");
    });
    test("Change Work Experience and Submit", async ({ page }) => {
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");
        await page.fill("#workExperience", "10");
        await page.click("[data-qa=profile-submit-button]");
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");
        const experience = page.locator("#workExperience");
        await expect(experience).toHaveValue("10");
    });
    test("Change Birthday and Submit", async ({ page }) => {
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");    
        //const birthdayDate = page.locator(".field-birthday .md-input");    
        //oldBirthdayDate = await birthdayDate.inputValue();
        //console.log(oldBirthdayDate);
        await page.fill(".field-birthday .md-input", "2000-09-22");
        //await page.pause();
        await (await page.waitForSelector("text=Ok")).click();
        //await page.pause();
        await page.click("[data-qa=profile-submit-button]");
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");  
        const birthdayDate = page.locator(".field-birthday .md-input");      
        await expect(birthdayDate).toHaveValue("2000-09-22");
    });
    test("Change Last Name and Cancel", async ({ page }) => {
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");
        const lastNameField = page.locator("#last-name");        
        await lastNameField.fill("Cancel Last name");
        await page.click("[data-qa=profile-cancel-button]");
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");
        await expect(lastNameField).not.toHaveValue("Cancel Last name");
    });
    test("Change Last Name and Submit", async ({ page }) => {
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");
        const lastNameField = page.locator("#last-name");
        oldLastName = await lastNameField.inputValue();
        console.log(oldLastName);
        await lastNameField.fill("Submit Last name");
        await page.click("[data-qa=profile-submit-button]");
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");
        await expect(lastNameField).toHaveValue("Submit Last name");
    });
    test("Change Phone Number and Cancel", async ({ page }) => {
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");
        const phoneNumber = page.locator("#phone");
        await phoneNumber.fill("9999999999");
        await page.click("[data-qa=profile-cancel-button]");
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");
        await expect(phoneNumber).not.toHaveValue("9999999999");
    });
    test("Change Phone Number and Submit", async ({ page }) => {
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");
        const phoneNumber = page.locator("#phone");
        oldPhoneNumber = await phoneNumber.inputValue();
        console.log(oldPhoneNumber);
        await phoneNumber.fill("987654321");
        await page.click("[data-qa=profile-submit-button]");
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");
        await expect(phoneNumber).toHaveValue("987654321");
    });
    test.afterAll(async ({page}) => {
        await page.goto("/");
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");

        //Return old values
        const firstNameField = page.locator("#first-name");
        await firstNameField.fill(oldFirstName);
        const lastNameField = page.locator("#last-name");
        await lastNameField.fill(oldLastName);
        const phoneNumber = page.locator("#phone");
        await phoneNumber.fill(oldPhoneNumber);
        //const birthdayDate = page.locator(".field-birthday .md-input");
        //await birthdayDate.fill(oldBirthdayDate);
        await page.click("[data-qa=profile-submit-button]");
        await page.click(".hamburger-checkbox");
        await page.click("[data-qa=profile-option]");

        //Check old values
        await expect(firstNameField).toHaveValue(oldFirstName);
        await expect(lastNameField).toHaveValue(oldLastName);
        await expect(phoneNumber).toHaveValue(oldPhoneNumber);
        //await expect(birthdayDate).toHaveValue(oldBirthdayDate);
    });
});