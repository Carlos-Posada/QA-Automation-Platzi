import BasePage from "./BasePage";

export default class LoginPage extends BasePage{

    //Cuando hay herencia debemos utilizar superconstructor
    constructor(){
        super()
        this.navBar = "//div[@class='menu-wrapper']"
        this.inputEmail = "input[placeholder='Email']"
        this.inputPassword = "input[placeholder='Password']"
        this.submitButton = '(//button[1][@type="submit"])[1]'
        this.loginPageText = "//h2[contains(text(), 'Hi,')]"

    }

    async visit(){
        await page.goto('https://phptravels.net/login')
        await page.waitForXPath(this.navBar)
        const url = this.getUrl()
        console.log('url: ',url)

    }

    async login(email,password){
        await page.waitForSelector(this.inputEmail)
        await this.type(this.inputEmail,email)
        await this.type(this.inputPassword,password)
        await this.click(this.submitButton)
    }

    async validatelogin(){
        await page.waitForXPath(this.loginPageText)
        await page.waitForXPath(this.navBar)
    }

}