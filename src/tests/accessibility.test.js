const AxeBuilder = require("@axe-core/webdriverio").default;
const { createHtmlReport } = require("axe-html-reporter");

describe("Accessibility Test", () => {
  it("should get the accessibility results from the specified pages", async () => {
    const url = "https://github.com/angelleoneltorrelopez";

    // Navigate to the current URL
    await browser.url(url);

    // Wait for the page to load completely
    await browser.waitUntil(
      async () =>
        (await browser.execute(() => document.readyState)) === "complete",
      { timeout: 10000, timeoutMsg: "Page did not load within 10 seconds" }
    );

    // Analyze the current page using axe-core
    const axeBuilder = new AxeBuilder({ client: browser });
    const accessibilityResult = await axeBuilder.analyze();

    // Print the results for the current URL to the terminal
    console.log("Accessibility Results for", url);
    console.log(JSON.stringify(accessibilityResult, null, 2));

    // Generate an HTML report for the results of the current URL
    createHtmlReport({
      results: accessibilityResult,
      options: { reportFileName: `${url.split("/").pop()}-axe-report.html` },
    });
  });
});
