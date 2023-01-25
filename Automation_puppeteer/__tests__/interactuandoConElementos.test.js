const puppeteer = require('puppeteer');

//Promesa para el delay
function delay(time) {
	return new Promise(function(resolve) { 
		setTimeout(resolve, time)
	});
 }

describe('Interactuando con elementos', () => {
	it('Llenando elementos de un formulario.', async () => {
		const browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null
		});
	/*
		//Page 1
        const page = await browser.newPage()
        await page.goto('https://demo.guru99.com/test/simple_context_menu.html')
		
		//Evento Listener
		page.on('dialog',async(dialog)=>{
			await dialog.accept()
		})

        //Evento click Derecho:
        await page.click('#authentication > span',{button: 'right',delay: 500})
		//wait page.waitForTimeout(3000)
		//Evento Doble click
		await page.click('#authentication > button',{clickCount: 2,delay: 500})
        await page.waitForTimeout(3000)
	*/

		//Other page: TestCafe
		//Direccionamiento de la página
		const page = await browser.newPage()
		await page.goto('https://devexpress.github.io/testcafe/example/')

		//Acciones atraves de los selectores:
		await page.type('#developer-name','Carlos Andres',{delay:120})
		await page.click('#remote-testing')
    	await page.click('#traffic-markup-analysis')
    	await page.click('#tried-test-cafe')
		await page.click('#windows')
		await page.select('#preferred-interface','JavaScript API')
		await page.type('#comments','Puppeteer is Awesome',{delay:120})
		await page.click('#submit-button')
		await delay(3000)

		//Cerrar la página
		await browser.close();
	}, 350000);
});