const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");

async function Login() {
  describe("Login Test", function () {
    it("TC01 - Login Success", async function () {

      let options = new chrome.Options();
      options.addArguments("--headless");

      let driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
      try {
        await driver.get("https://www.saucedemo.com/");
        await driver.findElement(By.id("user-name")).sendKeys("standard_user");
        await driver
          .findElement(By.xpath("//input[@id='password']"))
          .sendKeys("secret_sauce");
        await driver.findElement(By.name("login-button")).click();

        let titleText = await driver
          .findElement(By.xpath("//div[@class='app_logo']"))
          .getText();
        assert.strictEqual(
          titleText.includes("Swag Lab"),
          true,
          "Title does not include Swag Lab"
        );

        //add item to cart
        await driver
          .findElement(By.id("add-to-cart-sauce-labs-backpack"))
          .click();

        //validate item sukses ditambahkan ke cart
        let addCart = await driver
          .findElement(By.xpath("//span[@class='shopping_cart_badge']"))
          .getText();
        assert.strictEqual(addCart > 0, true, "No item on cart");
      } finally {
        setTimeout(async () => {
          await driver.quit();
        }, 5000);
      }
    }),
      it("TC02 - Login Failed", async function () {
        let options = new chrome.Options();
      options.addArguments("--headless");

      let driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
      try {
        await driver.get("https://www.saucedemo.com/");
        await driver.findElement(By.id("user-name")).sendKeys("standard_user");
        await driver
          .findElement(By.xpath("//input[@id='password']"))
          .sendKeys("secret_saucee");
        await driver.findElement(By.name("login-button")).click();

        let titleText = await driver
          .findElement(By.css(".error-message-container"))
          .getText();
        assert.strictEqual(
          titleText.includes(
            "Epic sadface: Username and password do not match any user in this service"
          ),
          true,
          "Error message"
        );
      } finally {
        setTimeout(async () => {
          await driver.quit();
        }, 5000);
      }
      });
  });
}

Login();
