const puppeteer = require('puppeteer');

//Promesa para el delay
function delay(time) {
	return new Promise(function(resolve) { 
		setTimeout(resolve, time)
	});
 }

describe('Tipos de espera', () => {
	it('Mostrando los tipos de espera.', async () => {
		const browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null
            // slowMo: 500
		});
		const page = await browser.newPage()
		
        //Espera con la propiedad waitUntil: 'networkidle0,networkidle2, doccontentloaded'
        //await page.goto('https://platzi.com/', {waitUntil: 'networkidle0'})

        //Espera Explicita: No recomendable
        //await delay (5000)
		
        //Espera por un Css-Selector
        //await page.waitForSelector('#Header-v2 > nav > div.Logo > div > a > div > figure.LogoHeader-name > img')

        //Espera por un Xpath
        //await page.waitForXPath('//*[@id="Header-v2"]/nav/div[1]/div/a/div/figure[2]/img')

        await page.goto('https://demoqa.com/modal-dialogs',{waitUntil: 'networkidle0'})
        //await page.waitForSelector('#showSmallModal',{visible: true})
        const button = await page.waitForXPath('//*[@id="showSmallModal"]',{visible: true})
        await button.click()

        //Espera por función
        await page.waitForFunction(() => document.querySelector('#example-modal-sizes-title-sm').innertext ==='Small text')

        //EJ para observar un viewport
        // const observarResize = page.waitForFunction('window.innerWidth < 100')
        // await page.setViewport({width:50, height:50})
        // await observarResize

        await page.click('#closeSmallModal')
        await page.waitForFunction(() => !document.querySelector('#example-modal-size-title-sm'))
		

        //Cerrar la página
		await browser.close();

	}, 350000);
});