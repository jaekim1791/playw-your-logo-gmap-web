const { test, expect, webkit } = require("@playwright/test");

test.describe("VALIDATE STORE ON GOOLGE MAP", () => {
  test("Launch Our Stores Page, able to locate a store in Google Map, and verify on Google Map ", async ({
    browser,
  }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("http://automationpractice.com/index.php?controller=stores");
    await page.locator(".dismissButton").click();

    await page.locator("button[title='Zoom in']").click();

    await page.locator("button[title='Zoom in']").click();

    await page.click("#map"); // NOTE: "click()" is required for mouse.down() to work.
    await page.mouse.down();

    await page.mouse.move(700, 0, { steps: 20 }); // NOTE: {steps: } option is required to work. mouse.move() (x,y) coordinate is buggy and does not work as it should. Also, the coordiates work as (y,x) instead of (x,y).
    await page.mouse.up();

    await page.click("(//div[@role='button'])[4]"); // Coconut Grove store

    const [googleMapTab] = await Promise.all([
      context.waitForEvent("page"),
      page.click("a[href='http://maps.google.com/maps?saddr=&daddr=(25.736296, -80.244797)']"),
    ]);

    await googleMapTab.waitForURL("https://www.google.com/maps/dir//25.736296,-80.244797/@25.7360243,-80.3150666,12z");

    expect(
      googleMapTab.url().includes("https://www.google.com/maps/dir//25.736296,-80.244797/@25.7360243,-80.3150666,12z")
    ).toBeTruthy();

    console.log(googleMapTab.url());

    await expect(googleMapTab.locator("div[id='sb_ifc51'] >> input[aria-label]")).toHaveValue(
      "2999 SW 32nd Ave, Miami, FL 33133"
    );
  });
});
