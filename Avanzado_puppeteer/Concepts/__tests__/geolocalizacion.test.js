const puppeteer = require("puppeteer")

describe('Geolocalización', () =>{
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
           
        }),

        afterAll(async()=>{
            await browser.close()
        },1000);

        //Change geolocation for test application that requires it.
        test('Cambio de geolocalización', async () => {
        
            //Obener contexto de lo que se quiere hacer, en este caso el browser.
            const context = browser.defaultBrowserContext()
            await context.overridePermissions('https://chercher.tech/practice/geo-location.html', ['geolocation'])

            await page.setGeolocation({latitude: 78, longitude: 30})
            await page.goto('https://chercher.tech/practice/geo-location.html',{waitUntil: 'networkidle0'})
            await page.waitForTimeout(3000)

            await page.setGeolocation({latitude: 30, longitude: 78})
            await page.goto('https://chercher.tech/practice/geo-location.html',{waitUntil: 'networkidle0'})
            await page.waitForTimeout(3000);

        },20000);

     
});