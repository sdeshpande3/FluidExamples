const config = require("../jest.config");

let url;

describe("react-demo", () => {

  const load = async () => {
    await page.goto(config.globals.URL, {
      waitUntil: ["networkidle2", "load"],
      timeout: 60000
    });
  };

    beforeEach(async () => {
      await load();
      expect(await page.title()).toBe("React App");
      url = await page.url();
    });

    it("Load the container", async () => {
      console.log("Container URL---", url);
    });
});