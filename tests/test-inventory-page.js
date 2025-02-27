const { Builder, By, Key, until} = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../pages/login-page");
const InventoryPage = require("../pages/inventory-page");
const fs = require("fs");

async function saucedemoInventoryTest(){
    describe ("Saucedemo Inventory Page test", function(){
        this.timeout(5000)
        let driver;
        let browserName = "chrome";
        let loginPage;
        let inventoryPage;

        const screenshotsDir = "./screenshots/";
        if (!fs.existsSync(screenshotsDir)){
            fs.mkdirSync(screenshotsDir, {recursive: true});
        }

        beforeEach(async function(){
            driver = await new Builder().forBrowser(browserName).build();
            loginPage = new LoginPage(driver);
            inventoryPage = new InventoryPage(driver);
            await loginPage.open("https://saucedemo.com");
        });

        it("TC03 - Add item to cart", async function(){
            await loginPage.login("standard_user", "secret_sauce")
            await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();
            let validateItem = await driver.findElement(By.className("shopping_cart_badge")).getText();
            assert.strictEqual(validateItem.length > 0, true, "No item in the cart");
        });

        afterEach(async function(){
            const screenshot = await driver.takeScreenshot();
            const filepath = `${screenshotsDir}${this.currentTest.title.replace(/\s+/g,  '_')}_${Date.now()}.png`;
            fs.writeFileSync(filepath, screenshot, 'base64');
            await driver.quit();
        });
    })
}

saucedemoInventoryTest();