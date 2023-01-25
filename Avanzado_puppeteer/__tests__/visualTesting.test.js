const puppeteer = require("puppeteer")
const {toMatchImageSnapshot} = require('jest-image-snapshot')
expect.extend({toMatchImageSnapshot})

describe('Visual testing', () =>{
    jest.setTimeout(30000)
        let browser
        let page
        beforeAll(async() =>{
            browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
            })

            page = await browser.newPage()
            await page.goto('https://www.google.com/search?q=animeflv&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjO-cKX4OP8AhU1sDEKHcssBrUQ_AUoAnoECAIQBA&biw=958&bih=545',{waitUntil: 'networkidle0'})
        })

        afterAll(async()=>{
            await browser.close()
        })

        //snapshot fullscreen
        test('Snapshot full screen ', async () => {
            
            await page.waitForSelector('img')
            const screenshot = await page.screenshot()

            expect(screenshot).toMatchImageSnapshot()
        });

        //snapshot of element
        test('Snapshot of one element ', async () => {
            
            const image = await page.waitForSelector('img')
            const screenshot = await image.screenshot()

            expect(screenshot).toMatchImageSnapshot({
                failureThreshold:0.05,
                failureThresholdType: 'percent'
            })
        });

        //snapshot table
        test('Snapshot of tablet ', async () => {
            
            const table = puppeteer.KnownDevices['iPad Pro']
            await page.emulate(table)

            await page.waitForSelector('img')
            const screenshot = await page.screenshot()

            expect(screenshot).toMatchImageSnapshot({
                failureThreshold:0.05,
                failureThresholdType: 'percent'
            })
        });

         //Remove image before snapshot
         test('Remove image before snapshot ', async () => {
            
            await page.waitForSelector('img')
            // await page.evaluate(()=> 
            // (document.querySelectorAll('img')|| []).forEach((img) => img.remove()))
            const screenshot = await page.screenshot()

            expect(screenshot).toMatchImageSnapshot({
                failureThreshold:0.05,
                failureThresholdType: 'percent'
            })
        });

})