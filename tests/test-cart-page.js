const { Builder, By, Key, until} = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../pages/login-page");
const InventoryPage = require("../pages/inventory-page");
const CartPage = require("../pages/cart-page");
const fs = require("fs");

async function saucedemoCartTest(){
    describe ("Saucedemo Inventory Page test", function(){
        this.timeout(5000)
        let driver;
        let browserName = "chrome";
        let loginPage;
        let inventoryPage;
        let cartPage;

        const screenshotsDir = "./screenshots/";
        if (!fs.existsSync(screenshotsDir)){
            fs.mkdirSync(screenshotsDir, {recursive: true});
        }

        beforeEach(async function(){
            driver = await new Builder().forBrowser(browserName).build();
            loginPage = new LoginPage(driver);
            inventoryPage = new InventoryPage(driver);
            cartPage = new CartPage(driver);
            await loginPage.open("https://saucedemo.com");
        });

        it("TC04 - Check item on cart", async function(){
            await loginPage.login("standard_user", "secret_sauce")
            await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();
            await driver.findElement(By.id("shopping_cart_container")).click();
            
            let cartItems = await driver.findElements(By.css(".cart_item"));
            assert.strictEqual(cartItems.length > 0, true, "Cart no item");
        });


        it("TC05 - Click checkout button", async function(){
            await loginPage.login("standard_user", "secret_sauce")
            await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();
            await driver.findElement(By.id("shopping_cart_container")).click();
            await driver.findElement(By.id("checkout")).click();
        });

        afterEach(async function(){
            const screenshot = await driver.takeScreenshot();
            const filepath = `${screenshotsDir}${this.currentTest.title.replace(/\s+/g,  '_')}_${Date.now()}.png`;
            fs.writeFileSync(filepath, screenshot, 'base64');
            await driver.quit();
        });
    })
}

saucedemoCartTest();