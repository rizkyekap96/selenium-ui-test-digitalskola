const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const edge = require("selenium-webdriver/edge");
const assert = require("assert");

async function Login() {

    const browsers = [
        {
            name : "chrome",
            options: new chrome.Options().addArguments("--headless"),
        },
        {
            name : "firefox",
            options: new firefox.Options().addArguments("--headless"),
        },
        {
            name : "MicrosoftEdge",
            options: new edge.Options().addArguments("--headless"),
        }
    ]

for (let browser of browsers){
    let driver = await new Builder()
    .forBrowser(browser.name)
    .setChromeOptions(browser.name === "chrome" ? browser.options : undefined)
    .setFirefoxOptions(browser.name === "firefox" ? browser.options : undefined)
    .setEdgeOptions(browser.name === "MicrosoftEdge" ? browser.options : undefined)
    .build();
  try {
    console.log(browser.name)
    //login
    await driver.get("https://www.saucedemo.com/");
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver
      .findElement(By.xpath("//input[@id='password']"))
      .sendKeys("secret_sauce");
    await driver.findElement(By.name("login-button")).click();

    //validasi user berada di dashboard
    let titleText = await driver
      .findElement(By.xpath("//div[@class='app_logo']"))
      .getText();
    assert.strictEqual(
      titleText.includes("Swag Lab"),
      true,
      "Title does not include Swag Lab"
    );


    //add item to cart
    await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();

    //validate item sukses ditambahkan ke cart
    let addCart = await driver.findElement(By.xpath("//span[@class='shopping_cart_badge']")).getText();
    assert.strictEqual(addCart > 0, true, "No item on cart");
   }
 finally {
    setTimeout(async () => {
      await driver.quit();
    }, 5000);
}
  }
}

Login();
