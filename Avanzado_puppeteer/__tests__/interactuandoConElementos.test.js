const puppeteer = require('puppeteer');
const {click, doubleClick, type} = require ('../lib/helpers')

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
	
		// //Page 1
        // const page = await browser.newPage()
        // await page.goto('https://demo.guru99.com/test/simple_context_menu.html')
		
		// //Evento Listener
		// page.on('dialog',async(dialog)=>{
		// 	await dialog.accept()
		// })

        // //Evento click Derecho:
        // await page.click('#authentication > span',{button: 'right',delay: 500})
		// //wait page.waitForTimeout(3000)
		// //Evento Doble click
		// await doubleClick(page,'#authentication > button')
        // await page.waitForTimeout(3000)
	

		//Other page: TestCafe
		//Direccionamiento de la página
		const page = await browser.newPage()
		await page.goto('https://devexpress.github.io/testcafe/example/')

		//Acciones atraves de los selectores:
		await type(page,'#developer-name','Carlos Andres',{delay:120})
		await click(page,'#remote-testing')
    	await click(page,'#traffic-markup-analysis')
    	await click(page,'#tried-test-cafe')
		await click(page,'#windows')
		await page.select('#preferred-interface','JavaScript API')
		await type(page,'#comments','Puppeteer is Awesome',{delay:120})
		await click(page,'#submit-button')
		await delay(3000)

		//Cerrar la página
		await browser.close();
	}, 350000);
});