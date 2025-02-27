const { Builder, By, Key, until} = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../pages/login-page");
const InventoryPage = require("../pages/inventory-page");
const CartPage = require("../pages/cart-page");
const CheckOutStepOne = require("../pages/checkout-step-one");
const CheckOutStepTwo = require("../pages/checkout-step-two");
const fs = require("fs");

async function saucedemoCheckOut2Test(){
    describe ("Saucedemo Inventory Page test", function(){
        this.timeout(10000)
        let driver;
        let browserName = "chrome";
        let loginPage;
        let inventoryPage;
        let cartPage;
        let checkoutStepOne;
        let checkoutStepTwo;

        const screenshotsDir = "./screenshots/";
        if (!fs.existsSync(screenshotsDir)){
            fs.mkdirSync(screenshotsDir, {recursive: true});
        }

        beforeEach(async function(){
            driver = await new Builder().forBrowser(browserName).build();
            loginPage = new LoginPage(driver);
            inventoryPage = new InventoryPage(driver);
            cartPage = new CartPage(driver);
            checkoutStepOne = new CheckOutStepOne(driver);
            checkoutStepTwo = new CheckOutStepTwo(driver);
            await loginPage.open("https://saucedemo.com");
        });

        it("TC07 - Finish Checkout item", async function(){
            await loginPage.login("standard_user", "secret_sauce");
            await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();
            await driver.findElement(By.id("shopping_cart_container")).click();
            await driver.findElement(By.id("checkout")).click();
            await checkoutStepOne.clickContinue("Rizky Eka", "Pratama", "12630");
            await checkoutStepTwo.clickFinish();
        });

        afterEach(async function(){
            const screenshot = await driver.takeScreenshot();
            const filepath = `${screenshotsDir}${this.currentTest.title.replace(/\s+/g,  '_')}_${Date.now()}.png`;
            fs.writeFileSync(filepath, screenshot, 'base64');
            await driver.quit();
        });
    })
}

saucedemoCheckOut2Test();