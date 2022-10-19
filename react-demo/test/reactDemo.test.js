/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const config = require("../jest.config");

describe("App.js", () => {
    beforeAll(async () => {
        // Wait for the page to load first before running any tests
        // so this time isn't attributed to the first test
        await page.goto(config.globals.PATH, { waitUntil: "load", timeout: 0 });
    }, 45000);

    it("setup", () => {
        console.log("working");
    });
});
