const puppeteer = require("puppeteer")

describe('Generación de Pdfs.', () =>{
    jest.setTimeout(100000)
        let browser;
        let page;
        beforeAll(async() =>{
            browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            });

            const context = await browser.createIncognitoBrowserContext();
            page = await context.newPage()
            await page.goto('https://google.com/',{waitUntil: 'networkidle0'})
        }),

        afterAll(async()=>{
            await browser.close()
        },10000);

        //full pdf
        test('Pdf de pantalla completa', async () => {

        //Construcción del estilo pdf
           let pdfCSS = []
           pdfCSS.push('<style>')
           pdfCSS.push('h1 {font-size:10px; margin-left:30px;}')
           pdfCSS.push('</style>')
           const css = pdfCSS.join('')

        //Puppeteer
        await page.pdf({
            path:'./google.pdf',
            format: 'A4',
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: css + '<h1>'+'Primer pdf puppeteer'+'</h1>',
            footerTemplate: css + '<h1> page <span class="pageNumber></span> of <span class="totalPages"></span></h1>',
            margin:{
                top: '100px',
                bottom: '100px',
                rigth: '30px',
                left: '30px'
            }
        })

        },10000);

        //Landscape
        test('Pdf de pantalla completa landscape', async () => {

            //Construcción del estilo pdf
               let pdfCSS = []
               pdfCSS.push('<style>')
               pdfCSS.push('h1 {font-size:10px; margin-left:30px;}')
               pdfCSS.push('</style>')
               const css = pdfCSS.join('')
    
            //Puppeteer
            await page.pdf({
                path:'./googleLandscape.pdf',
                format: 'A4',
                printBackground: true,
                displayHeaderFooter: true,
                headerTemplate: css + '<h1>'+'Primer pdf puppeteer'+'</h1>',
                footerTemplate: css + '<h1> page <span class="pageNumber></span> of <span class="totalPages"></span></h1>',
                margin:{
                    top: '100px',
                    bottom: '100px',
                    rigth: '30px',
                    left: '30px'
                },
                landscape: true

            })
    
            },10000);

});