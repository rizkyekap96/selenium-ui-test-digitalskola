const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

async function Login() {

  //Membuat koneksi dengan webdriver
  let driver = await new Builder()
    .forBrowser("chrome")
    .build();
  try {
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
    assert.strictEqual(addCart == 0, true, "No item on cart");
   }
 finally {
    setTimeout(async () => {
      await driver.quit();
    }, 5000);
  }
}

Login();
