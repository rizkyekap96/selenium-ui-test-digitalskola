const { By } = require("selenium-webdriver");

class checkoutStepOne{
    constructor(driver){
        this.driver = driver;
        this.continueButton = By.id("continue");
        this.firstNameInput = By.id("first-name");
        this.lastNameInput = By.id("last-name");
        this.zipCodeInput = By.id("postal-code");
    }


    async fillInformation (firstName, lastName, zipCode){
        await this.driver.findElement(this.firstNameInput).sendKeys(firstName);
        await this.driver.findElement(this.lastNameInput).sendKeys(lastName);
        await this.driver.findElement(this.zipCodeInput).sendKeys(zipCode);
    }

    async clickContinue (firstName, lastName, zipCode){
        await this.driver.findElement(this.firstNameInput).sendKeys(firstName);
        await this.driver.findElement(this.lastNameInput).sendKeys(lastName);
        await this.driver.findElement(this.zipCodeInput).sendKeys(zipCode);
        await this.driver.findElement(this.continueButton).click();
    }

}

module.exports = checkoutStepOne;