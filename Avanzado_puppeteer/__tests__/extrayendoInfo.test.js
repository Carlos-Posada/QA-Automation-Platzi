const puppeteer = require("puppeteer")
const {getText,getCount} = require('../lib/helpers')

describe('Extrayendo infromación', () =>{
    jest.setTimeout(30000)
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

        })

        it('Extraer la información de un elemento', async () => {
        
            //Extrayendo texto de un boton con selector css
            await page.waitForSelector('#Header-v2 > nav > div.Actionsv2 > a')
            const aprendizaje = await getText(page,'#Header-v2 > nav > div.Actionsv2 > a')
            console.log('Aprendizaje: ', aprendizaje)



        })

        it('Contar los elementos de una página',async () =>{

            // .$$ corre un querySelectorAll() -> regresa un arreglo
            const imags = await getCount(page, 'img')
            console.log('Imagenes: ',imags)

        })
})