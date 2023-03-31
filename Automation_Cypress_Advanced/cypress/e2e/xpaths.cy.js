describe('Trabajar con Xpaths', () => {
    
    it('Obtenerlo con un css selector', () => {
        
        cy.visit('/')
        cy.get('#root > div.container > div:nth-child(1) > div:nth-child(3) > div > center > div.card-header > h1').should("contain","Venusaur");
    });

    it('Obtenerlo con un Xpath', () => {
        
        cy.visit('/')
        cy.xpath('//h1[contains(text(),"Venusaur")]').should("contain","Venusaur");
    });

    it('Forma cypress sin xpath ni selectores', () => {
        
         cy.visit('/')
         cy.contains("Venusaur").should("be.visible");
    });
});