const { By } = require("selenium-webdriver");

class checkoutStepTwo{
    constructor(driver){
        this.driver = driver;
        this.finishButton = By.id("finish");
    }
    async clickFinish (){
        await this.driver.findElement(this.finishButton).click();
    }


}

module.exports = checkoutStepTwo;