import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config:PlaywrightTestConfig = {
    timeout: 30000,
    expect:{
        timeout: 5000,
    },
    retries: 1,
    use: {
        baseURL: "https://myretro-stg.tochkavhoda.ru/",
        headless: false,
        viewport: {width: 1280, height: 720},
        actionTimeout: 5000,
        video: "off",
        screenshot: "off",               
    },
    projects: [
        {
            name: "chromium",
            use: {...devices["Desktop Chrome"]},
        },
        {
            name: "firefox",
            use: {...devices["Desktop Firefox"]},
        },
        {
            name: "webkit",
            use: {...devices["Desktop Safari"]},
        },
    ],      

};
export default config;