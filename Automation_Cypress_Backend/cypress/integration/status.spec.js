describe('Probando statuses', () => {

    it('Debe validar status code successfull', () => {
        cy.request('employees')
        .its('status')
        .should('eq',200)
    })

    it('Debe validar status code fail', () => {
        cy.request({url:'employees/7', failOnStatusCode: false})
        .its('status')
        .should('eq',404)
    })

    it.only('create a new employ', () => {
        cy.request('POST', 'employees', {
          name: 'Carlos',
          lastname: 'Posada',
          email: 'carlos.jest.edu.co',
        }).as('createdEmployee')

        cy.get('@createdEmployee').its('status').should('eq', 201);
    })
})