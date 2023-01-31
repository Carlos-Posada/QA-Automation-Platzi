import LoginPage from "../pages/LoginPage";

let loginpage

describe ('Iniciar sesion en la página', () =>{
    //jest.setTimeout(10000) 
        beforeAll(async ()=>{
            //Insancia de un objecto a partir de la clase LoginPage
            loginpage = new LoginPage()
        })

        it('Debe ir a la página',async ()=>{
            await loginpage.visit()
        },10000)
        it('Debe llenar los campos del Login',async ()=>{
            await loginpage.login('carlos.jest@udea.edu.co','a1b2c3d4')
        },10000) 
        it('validar que este en el dashboard',async ()=>{
            await loginpage.validatelogin()
            await page.waitForTimeout(3000)
        },10000)
})