const { By } = require("selenium-webdriver");

class cartPage{
    constructor(driver){
        this.driver = driver;
        this.cartItems = By.css(".cart_item");
    }
}
module.exports = cartPage;