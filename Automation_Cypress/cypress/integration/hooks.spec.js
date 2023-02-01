before(() => {
    cy.visit('/elements')
})

describe ('HOOKS', () => {
    
    before(() =>{
        cy.visit('/automation-practicce-form')
    }) 
    
    after(() => {
        cy.visit('/')
    })

    it('Asercion_1', () => {
        cy.visit('/automation-practicce-form')
        cy.url().should('include','demoqa.com')
        //Aserción sobre el elemento cypess -BDD.
        cy.get('#firstName').should('be.visible').and('have.attr', 'placeholder', 'First Name')
    })
})

after (() => {
    cy.visit('/interaction')
})