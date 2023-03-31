describe('Flaky test', () => {
    
    it('Single query comand', () => {
        
        cy.visit('/')
        // cy.get('#root > div.container > div:nth-child(1) > div:nth-child(3) > div > center > div.card-header > h1').should("contain","Venusaaaur");

        cy.contains('#root > div.container > div:nth-child(1) > div:nth-child(3) > div > center > div.card-header > h1').should("contain","Venusaaaur");
    });

    it.only('Alternar comando con aserciones', () => {
        
        cy.visit('/')
        cy.get('#root > div.container > div:nth-child(1) > div:nth-child(3) > div > center > div.card-header > h1').should("contain","Venusaaaur").parent().should("have.class","card-header");
    });
});