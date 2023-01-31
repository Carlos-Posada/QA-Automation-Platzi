export default class BasePage{

    //Obtener el titulo
    async getTitle(){
        return await page.title()
    }

    //obtener la url
    async getUrl(){
        return await page.url()
    }

    //Obtener el texto de un elemento
    async getText(selector){
        try{
            await page.waitForSelector(selector)
            return await page.$eval(selector,(el) => el.textContext)
        }catch(e){
            throw new Error(`Error al obtener el texto del selector ${selector}`)
        }
    }

    //Obtener un atributo deseado
    async getAttribute(selector, attribute){
        try{
            await page.waitForSelector(selector)
            return await page.$eval(selector,(el) => el.getAttribute(attribute))
        }catch(e){
            throw new Error(`Error al obtener el atributo del selector ${selector}`)
        }
    }

    //Obtener un valor deseado
    async getValue(selector){
        try{
            await page.waitForSelector(selector)
            return await page.$eval(selector,(el) => el.value)
        }catch(e){
            throw new Error(`Error al obtener el valor del selector ${selector}`)
        }
    }

    //Contar los elementos de una página
    async getCount(selector){
        try{
            await page.waitForSelector(selector)
            return await page.$$eval(selector,(el) => el.length)
        }catch(e){
            throw new Error(`Error al obtener el # de elementos del selector ${selector}`)
        }
    }

    //dar click
    async click(selector) {
        console.log(selector)
        try {
            const element = await page.waitForXPath(selector)
            await element.click()
        }
        catch (e) {
            try {
                await page.waitForSelector(selector)
                await page.click(selector)
            }
            catch (e) {
                throw new Error(`Error al dar click al selector ${selector}`)
            }
        }
    }

    //Escribir en un textBox
    async type(selector, text, opts={}){
        try{
            await page.waitForSelector(selector)
            await page.click(selector,{clickCount: 3})
            await page.type(selector,text,opts)
        }catch(e){
            throw new Error(`Error al escribir en el selector ${selector}`)
        }
    }

    //Doble click
    async doubleClick(selector){
        try{
            await page.waitForSelector(selector)
            await page.click(selector,{clickCount: 2})
        }catch(e){
            throw new Error(`Error al dar doble click al selector ${selector}`)
        }
    }

    //Esperar
    async wait(time){
        await page.waitForTimeout(time) 
        //await new Promise(r => setTimeout(r, time)) 
    }

}