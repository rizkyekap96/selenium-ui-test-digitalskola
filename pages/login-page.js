const { By } = require("selenium-webdriver");

class loginPage{
    constructor(driver){
        this.driver = driver;
        this.usernameInput = By.id("user-name");
        this.passwordInput = By.id("password");
        this.loginButton = By.id("login-button");
        this.errorMessage = By.css(".error-message-container");
        this.titleText = By.css(".app_logo");
    }

async open(url){
    await this.driver.get(url);
}

async login (username,password){
    await this.driver.findElement(this.usernameInput).sendKeys(username);
    await this.driver.findElement(this.passwordInput).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
}

async getErrorMessage(){
    return await this.driver.findElement(this.errorMessage).getText();
}
}


module.exports = loginPage