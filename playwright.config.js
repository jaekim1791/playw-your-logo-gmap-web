const { devices } = require("@playwright/test");

const config = {
  testDir: "./tests",

  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },
  retries: 1,

  fullyParallel: true,

  use: {
    launchOptions: {
      // args: ["--start-maximized"],
      // slowMo: 1000,
    },
    headless: false,
    // browserName: "chromium",
    // browserName: "firefox",
    // browserName: "webkit",
    // viewport: { width: 1366, height: 768 },
    trace: "retain-on-failure",
  },

  // reporter: "allure-playwright",

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    // NOTE: Issues with Safari over compensating "x" coordinate. Locator unable to find Store.
    // {
    //   name: "webkit",
    //   use: {
    //     ...devices["Desktop Safari"],
    //   },
    // },
    // NOTE: If MS Edge is ran on its own, "x" coordiate will over compensate.
    {
      name: "Microsoft Edge",
      use: {
        channel: "msedge",
      },
    },
  ],
};

module.exports = config;
