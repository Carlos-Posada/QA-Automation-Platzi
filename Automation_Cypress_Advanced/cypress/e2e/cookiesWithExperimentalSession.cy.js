
describe('COOKIES', function (){

    this.beforeEach (() => {
        cy.session("login", () => {
            cy.visit('/')
            cy.setCookie("nombre", "Carlos")
        })
    })

    //Obtener una cookie particular
    it('Obtener una cookie en especifico', function () {

        cy.visit('/')
        cy.getCookie("nombre").should("have.a.property","value","Carlos");  
    });
    
});