//importar archivos y librerias
import LoginPage from "../pages/LoginPage";
import FlightsPage from "../pages/FlightsPage";
import Navbar from "../components/NavBar";

//Variables:
let loginPage
let flightsPage
let navbar

describe ('Iniciar reserva de vuelo', () => {

        beforeAll (async () => {
            loginPage = new LoginPage()
            flightsPage = new FlightsPage()
            navbar = new Navbar()
        })

        //Iniciar sesión
        it('Sign in: ', async () => {
            await loginPage.visit()
            await loginPage.login('carlos.jest@udea.edu.co','a1b2c3d4')
            await loginPage.validatelogin()
        },20000)

        //Buscar vuelos:
        it('Navegar hacia la página de vuelos', async () => {
            await navbar.validateNavBarIsPresent()
            await navbar.selectMenuItem('flights')
        },20000)

        it('Validar página de vuelos y seleccionarlos', async () => {
            await flightsPage.validatePage()
            await flightsPage.selectFly('Medellin', 'New York', '25-01-2025',2)
        },400000)

        it('Validar busqueda de vuelos', async () => {
            await flightsPage.validateFlights()
        },100000)
})

