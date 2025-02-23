const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const edge = require("selenium-webdriver/edge");
const assert = require("assert");

async function SauceDemo() {
  describe("saucedemo.com", function () {
    this.timeout(5000);

    const browsers = [
      {
        name: "chrome",
        options: new chrome.Options().addArguments("--headless"),
      },
      {
        name: "firefox",
        options: new firefox.Options().addArguments("--headless"),
      },
      {
        name: "MicrosoftEdge",
        options: new edge.Options().addArguments("--headless"),
      },
    ];

    for (let browser of browsers) {
      describe(`Testing on ${browser.name}`, function () {
        let driver;

        before(async function () {
          driver = await new Builder()
            .forBrowser(browser.name)
            .setChromeOptions(browser.name === "chrome" ? browser.options : undefined)
            .setFirefoxOptions(browser.name === "firefox" ? browser.options : undefined)
            .setEdgeOptions(browser.name === "MicrosoftEdge" ? browser.options : undefined)
            .build();
        });

        after(async function () {
          await driver.quit();
        });

        it("TC01 - Login Success", async function () {
          await driver.get("https://www.saucedemo.com/");
          await driver.findElement(By.id("user-name")).sendKeys("standard_user");
          await driver.findElement(By.id("password")).sendKeys("secret_sauce");
          await driver.findElement(By.name("login-button")).click();

          let titleText = await driver.findElement(By.className("app_logo")).getText();
          assert.strictEqual(titleText.includes("Swag Lab"), true, "Title does not include Swag Lab");
        });

        it("TC02 - Login Failed", async function () {
          await driver.get("https://www.saucedemo.com/");
          await driver.findElement(By.id("user-name")).sendKeys("standard_user");
          await driver.findElement(By.id("password")).sendKeys("secret_saucee");
          await driver.findElement(By.name("login-button")).click();

          let errorMessage = await driver.findElement(By.css(".error-message-container")).getText();
          assert.strictEqual(
            errorMessage.includes("Epic sadface: Username and password do not match any user in this service"),
            true,
            "Error message not displayed correctly"
          );
        });

        it("TC03 - Add item to cart", async function () {
          await driver.get("https://www.saucedemo.com/");
          await driver.findElement(By.id("user-name")).sendKeys("standard_user");
          await driver.findElement(By.id("password")).sendKeys("secret_sauce");
          await driver.findElement(By.name("login-button")).click();

          await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();

          let cartItemCount = await driver.findElement(By.className("shopping_cart_badge")).getText();
          assert.strictEqual(cartItemCount.length > 0, true, "No item in the cart");
        });

        it("TC04 - Validate item on cart", async function () {
          await driver.get("https://www.saucedemo.com/");
          await driver.findElement(By.id("user-name")).sendKeys("standard_user");
          await driver.findElement(By.id("password")).sendKeys("secret_sauce");
          await driver.findElement(By.name("login-button")).click();

          await driver.findElement(By.id("shopping_cart_container")).click();

          let cartItems = await driver.findElements(By.css(".cart_item"));
          assert.strictEqual(cartItems.length > 0, true, "Cart no item");
        });
      });
    }
  });
}

SauceDemo();
