const puppeteer = require("puppeteer")

describe('Capturas de pantalla', () =>{
    jest.setTimeout(10000)
        let browser;
        let page;
        beforeAll(async() =>{
            browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            });

            const context = await browser.createIncognitoBrowserContext();
            page = await context.newPage()
            await page.goto('https://www3.animeflv.net/anime/tokyo-revengers-seiya-kessenhen',{waitUntil: 'networkidle0'})
        }),

        afterAll(async()=>{
            await browser.close()
        },10000);

        //full screenshot
        test('Captura de pantalla completa', async () => {

            await page.screenshot({
                path:'./capturaDePantalla.png',
                fullPage: true
            })

        },10000);

        //Screenshot the area
        test('Captura de pantalla seleccionando un area', async () => {

            await page.screenshot({
                path:'./capturaDePantallaSeleccionandoArea.png',
                clip:{
                    x:0,
                    y:0,
                    width:400,
                    height:800
                }
            })

        },10000);

        //Transparent full screenshot
        test('Captura de pantalla transparente', async () => {

            await page.evaluate(()=> (document.body.style.background = 'transparent'))

            await page.screenshot({
                path:'./capturaDePantallaTransparente.png',
                omitBackground: true
            })

        },10000);

        //screen shot of element
        test('Captura de pantalla a un elemento', async () => {

            const elemento = await page.waitForSelector('body > div.Wrapper > div > div > div.Container > div > aside > div.AnimeCover > div > figure > img')
            await elemento.screenshot({
                path:'./capturaDePantallaElemento.png',
            })
        },10000);
});