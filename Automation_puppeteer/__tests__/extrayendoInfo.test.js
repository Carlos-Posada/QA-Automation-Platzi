const { default: puppeteer } = require("puppeteer")

describe('Extrayendo infromación', () =>{

    let browser
    let page

    // beforeEach(async() =>{
    //     browser = await puppeteer.launch({
    //     headless: false,
    //     defaultViewport: null
    //     })

    //     page = await browser.newPage()
    //     await page.goto('http://platzi.com',{waitUntil: 'networkidle0'})
    // })

    // afterEach(async()=>{
    //     await browser.close()
    // })

    beforeAll(async() =>{
        browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
        })

        page = await browser.newPage()
        await page.goto('http://platzi.com',{waitUntil: 'networkidle0'})
    })

    afterAll(async()=>{
        await browser.close()
    })

    it('Extraer el título y la url', async () => {

        const titulo = await page.title()
        const url = await page.url()

        //Depurando
        console.log('Titulo: ', titulo)
        console.log('Url: ', url)

    },350000)

    it('Extraer la información de un elemento', async () => {
       
        //Extrayendo texto de un boton con selector css
        await page.waitForSelector('#Header-v2 > nav > div.Actionsv2 > a')
        const aprendizaje = await page.$eval('#Header-v2 > nav > div.Actionsv2 > a', (button) => button.textContent)
        console.log('Aprendizaje: ', aprendizaje)

        //1ra forma: Extrayendo info de un boton con xpath(arreglo)
        const [button] = await page.$x('//*[@id="Header-v2"]/nav/div[5]/div/a')
        const property = await button.getProperty('textContent')
        const text = await property.jsonValue()
        console.log('texto1: ',text)

        //2da forma: Extrayendo info de un boton con xpath(arreglo)
        const text2 = await page.evaluate((name) => name.textContent, button)
        console.log('texto2: ',text2)

        //3ra forma: Extrayendo info de un boton con xpath(arreglo)
        const button3 = await page.waitForXPath('//*[@id="Header-v2"]/nav/div[5]/div/a')
        const text3 = await page.evaluate((name) => name.textContent, button3)
        console.log('texto3: ',text3)

    },350000)

    it('Contar los elementos de una página',async () =>{

        // .$$ corre un querySelectorAll() -> regresa un arreglo
        const imags = await page.$$eval('img', (imagenes) => imagenes.length)
        console.log('Imagenes: ',imags)

    },350000)
})