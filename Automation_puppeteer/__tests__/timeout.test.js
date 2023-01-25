const puppeteer = require('puppeteer');

describe('Tipos de espera', () => {

	jest.setTimeout(10000)

	it('Mostrando los tipos de espera.', async () => {
		const browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null
            // slowMo: 500
		});

		const page = await browser.newPage()
		page.setDefaultTimeout(10000)
		page.setDefaultNavigationTimeout(10000)
		await page.goto('https://platzi.com/home',{waitUntil: 'networkidle0'})

		//Close Page
		await browser.close();

	},10000)
});