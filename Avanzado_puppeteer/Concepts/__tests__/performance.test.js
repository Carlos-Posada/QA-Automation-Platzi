const puppeteer = require("puppeteer")
const fs = require('fs')

describe('performance', () =>{
    jest.setTimeout(10000)
        let browser;
        let page;

        beforeAll(async() =>{
            browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
            });

            page = await browser.newPage()
            await page.goto('https://www.crunchyroll.com/es/series/GY5P48XEY/demon-slayer-kimetsu-no-yaiba',{waitUntil: 'networkidle0'})     
        }),

        afterAll(async()=>{
            await browser.close()
        },1000);

        //Change geolocation for test application that requires it.
        test('Inclusión', async () => {
        
        
        await page.waitForSelector('img')
        const snapshot = await page.accessibility.snapshot()
        console.log(snapshot)

        },20000);

        test('Medir performance automatización', async () => {
        
            await page.waitForSelector('img')
            const metrics1 = await page.metrics()
            console.log(metrics1)

        },20000);

        test('Medir performance página', async () => {
        
            await page.waitForSelector('img')
            const metrics2 = await page.evaluate(()=>JSON.stringify(window.performance))
            console.log(metrics2)

        },20000);

        test('Medir performance page load', async () => {
        
            await page.tracing.start({path: 'profile.json'})
            await page.goto('https://www.crunchyroll.com/es/')
            await page.tracing.stop()    
        },20000);

        test('Medir performance page load con screenshots y extraerlos', async () => {
        
            await page.tracing.start({path: 'profile.json',screenshots:true})
            await page.goto('https://www.crunchyroll.com/es/')
            await page.tracing.stop()   
            const tracing = JSON.parse(fs.readFileSync('./profile.json','utf8')) 

            //Filtrar el JSON
            const traceScreenShots = tracing.traceEvents.filter(
                (x)=>
                x.cat === 'disabled-by-default-devtools.screenshot' &&
                x.name === 'Screenshot' &&
                typeof x.args !== 'undefined' &&
                typeof x.args.snapshot !== 'undefined' 
            )
            //Iterar sobre el arreglo para crear las imagenes
            traceScreenShots.forEach(function (snap, index) {
                fs.writeFile(`trace-screenshot-${index}.png`, snap.args.snapshot, 'base64', function (err) {
                    if (err) {
                        console.log('writeFile error', err)
                    }
                })
            })

        },20000);

        test('Debera medir el perfomance del First paint y First contentful paint ', async () => {
            // La primera métrica Contentful Paint (FCP) mide el tiempo desde que una página
            // comienza a cargarse hasta que cualquier parte del contenido de la página se representa en la pantalla.
    
            //Referencia https://developer.mozilla.org/en-US/docs/Web/API/Performance_Timeline
            const navigationPromise = page.waitForNavigation()
            await page.goto('https://platzi.com')
    
            await navigationPromise
    
            let firstPaint = JSON.parse(
                await page.evaluate(() => JSON.stringify(performance.getEntriesByName('first-paint')))
            )
    
            let firstContentfulPaint = JSON.parse(
                await page.evaluate(() =>
                    JSON.stringify(performance.getEntriesByName('first-contentful-paint'))
                )
            )
    
            console.log(`First paint: ${firstPaint[0].startTime}`)
            console.log(`First paint: ${firstContentfulPaint[0].startTime}`)
        }, 15000)
    
        test('Debera medir el perfomance de frames por segundo', async () => {
            const devtoolsProtocolClient = await page.target().createCDPSession()
            await devtoolsProtocolClient.send('Overlay.setShowFPSCounter', { show: true })
            await page.goto('https://platzi.com')
            await page.screenshot({ path: 'framesPorSegundo.jpg', type: 'jpeg' })
            await page.close()
        }, 15000)
});