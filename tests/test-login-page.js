const { Builder, By, Key, until} = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../pages/login-page");
const InventoryPage = require("../pages/inventory-page");
const fs = require("fs");

async function saucedemoLoginTest(){
    describe ("Saucedemo login test", function(){
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

        it("TC01 - Login Success", async function(){
            await loginPage.login("standard_user", "secret_sauce");
            const titleText = await inventoryPage.getTitleText();
            assert.strictEqual(titleText.includes("Swag Labs"),true,"Title does not include Swag Labs");
        });


        it("TC02 - Login Failed", async function(){
                    await loginPage.login("standard_userd", "secret_sauce");
                    const errorMessage = await driver.findElement(By.css(".error-message-container")).getText();;
                    assert.strictEqual(errorMessage.includes("Epic sadface: Username and password do not match any user in this service"),true,"Username and password match");
        });

        afterEach(async function(){
            const screenshot = await driver.takeScreenshot();
            const filepath = `${screenshotsDir}${this.currentTest.title.replace(/\s+/g,  '_')}_${Date.now()}.png`;
            fs.writeFileSync(filepath, screenshot, 'base64');
            await driver.quit();
        });
    })
}

saucedemoLoginTest();