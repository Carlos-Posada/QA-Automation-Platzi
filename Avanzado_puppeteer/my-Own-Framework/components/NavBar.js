import BasePage from "../pages/BasePage";

export default class NavBar extends BasePage{

        constructor(){
            super()
            this.navBar = "//div[@class = 'menu-wrapper d-flex']"
            //Selectores XPath con los que interactuaremmos
            this.menu = {
                hotels: "//a[normalize-space() = 'Hotels']",
                tours: "//a[normalize-space() = 'Tours']",
                flights: "//a[normalize-space() = 'flights']",
                transfers: "//a[normalize-space() = 'Transfers']",
                visa: "//a[normalize-space() = 'visa']",
                blog: "//a[normalize-space() = 'Blog']",
                offers: "//a[normalize-space() = 'Offers']"
            }  
        }

        //Validamos nuestro navbar en la página
        async validateNavBarIsPresent(){
            await page.waitForXPath(this.navBar)
            await page.waitForXPath(this.menu.hotels)
            await page.waitForXPath(this.menu.tours)
            await page.waitForXPath(this.menu.transfers)
            await page.waitForXPath(this.menu.flights)
            await page.waitForXPath(this.menu.visa)
            await page.waitForXPath(this.menu.blog)
            await page.waitForXPath(this.menu.offers)
        }

        //Seleccionar una parte del Menú
        async selectMenuItem(menuItem){
            await this.click(this.menu[menuItem])
        }
}