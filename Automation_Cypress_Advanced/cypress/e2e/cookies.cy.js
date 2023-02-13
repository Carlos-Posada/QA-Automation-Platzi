//Preserva una cookie, deshabilita el autoborrado de cypress
Cypress.Cookies.defaults({
    preserve: "nombre",
});

describe('COOKIES', function (){

    after(() => {
        cy.clearCookie("nombre")
    })

    it('Obtener cookies', () => {
        cy.visit('/')
        cy.getCookies().should('be.empty')
    });

    //Como agregar cookies
    it('Agregando Cookies', function () {
        cy.visit('/')
        cy.setCookie("nombre","Carlos");
        cy.getCookies().should("have.length",1)
    });

    //Obtener una cookie particular
    it('Obtener una cookie en especifico', function () {

        cy.visit('/')
        cy.getCookie("nombre").should("have.a.property","value","Carlos");  
    });
    
});