import BasePage from "../pages/BasePage";

export default class FlightsPage extends BasePage{

        constructor(){
            super()
            this.mainDiv = "//form[@class = 'main_search']"
            //Selectores XPath con los que interactuaremmos
            this.inputs = {
                from: '#autocomplete',
                to: '#autocomplete2',
                date: '#departure',
                passengers: "//a[@class='dropdown-toggle dropdown-btn waves-effect']",
                search: '#flights-search',
                firstOption:"(//div[@class='autocomplete-result'])[1]",
                numberAdultsPassengers: "(//i[@class='la la-plus'])[1]",
                numberChildsPassengers: "(//i[@class='la la-plus'])[2]"
            }
            
        }

        //Validamos nuestro navbar en la página
        async validatePage(){

            await page.waitForNavigation({waitUntil:'networkidle2'})
            await page.waitForXPath(this.mainDiv)
            await page.waitForSelector(this.inputs.from)
            await page.waitForSelector(this.inputs.to)
            await page.waitForSelector(this.inputs.date)
            await page.waitForXPath(this.inputs.passengers)
            await page.waitForSelector(this.inputs.search)
        }
    
        async selectFly(from,to,date,passengers){

            /*En los campos de entrada, cuando seleccionamos el "from" y el "to" de nuestro "fly" se nos despliega un menú, acá podemos hacer una búsqueda  o simplemente seleccionar el primero como en nuestro caso */

            //datos del from -> fly
            await this.type(this.inputs.from,from)
            this.click(this.inputs.firstOption)
                     
            //Datos del to -> fly
            await this.type(this.inputs.to,to)
            await this.click(this.inputs.firstOption)

            //fecha
            await this.type(this.inputs.date,date)

            //passengers.
            if(passengers != 1){
                await this.click(this.inputs.passengers)
                for(let i = 0; i < passengers-1;i++){
                    await this.click(this.inputs.numberAdultsPassengers)
                    //await this.click(this.inputs.numberChildsPassengers)
                }
            }

            //Buscar vuelos:
            await this.click(this.inputs.search)
        }
    
        async validateFlights(){
            this.wait(5)
        }
}