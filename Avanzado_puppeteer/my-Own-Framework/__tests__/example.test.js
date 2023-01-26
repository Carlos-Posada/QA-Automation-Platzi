describe ('Google',() =>{

    it('abrir navegador',async()=>{
        await page.goto('https://www.google.com/')
        await page.waitForTimeout(5000)
    },10000)
})