const puppeteer = require('puppeteer');

describe('Mi primer test en puppeteer', () => {
	it('Debe abrir y cerrar el navegador', async () => {
		const browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null
		});
		const page = await browser.newPage();
		await page.goto('https://www3.animeflv.net/');
		//await page.waitForTimeout(5000);
		await page.waitForSelector('img')
		
		//como recargar una página.
		await page.reload()	
		await page.waitForSelector('img')	
		
		//como ir a otra página.
		await page.goto('https://www3.cuevana3.ai/')	
		await page.waitForSelector('#aa-wp > header > p > img')

		//Navegar hacia atras.
		await page.goBack()
		await page.goForward()

		const page2 = await browser.newPage()
		await page2.goto('https://www.udea.edu.co/wps/portal/udea/web/inicio/somos-udea/estudiantes')
		await browser.close();
	}, 250000);
});