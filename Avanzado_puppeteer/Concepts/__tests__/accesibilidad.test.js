const puppeteer = require("puppeteer")
const {AxePuppeteer} = require('@axe-core/puppeteer')

describe('Accesibilidad', () =>{
    jest.setTimeout(10000)
        let browser;
        let page;

        beforeAll(async() =>{
            browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
            });

            page = await browser.newPage()
           
        }),

        afterAll(async()=>{
            await browser.close()
        },1000);

        //Change geolocation for test application that requires it.
        test('Inclusión', async () => {
        
        await page.goto('https://www.crunchyroll.com/es/series/GY5P48XEY/demon-slayer-kimetsu-no-yaiba',{waitUntil: 'networkidle0'})
        await page.waitForSelector('img')
        const snapshot = await page.accessibility.snapshot()
        console.log(snapshot)

        },20000);

        test('Probar accesibilidad con AXE', async () => {
        
            await page.setBypassCSP(true)
            await page.goto('https://www.crunchyroll.com/es/series/GY5P48XEY/demon-slayer-kimetsu-no-yaiba',{waitUntil: 'networkidle0'})
            await page.waitForSelector('img')
            const result = await new AxePuppeteer(page).analyze()
            console.log(result.violations[0])
    
            },20000);

     
});