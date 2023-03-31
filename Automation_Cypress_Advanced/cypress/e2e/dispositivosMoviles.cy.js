const DEVICES = [
    { viewport: "macbook-15", type: "desktop" },
    { viewport: "ipad-2", type: "mobile" },
    { viewport: [1280, 720], type: "desktop" },
    { viewport: [375, 667], type: "mobile" },
];


describe('Dispositivos moviles', () => {

    // it('Usando el viewport para simular dispositivos', () => {

    //     cy.viewport(1280,720)
    //     cy.visit('/')
    //     cy.contains("Safari").should("exist");
        
    // });

    // it('Usando el viewport para movil', () => {

    //     cy.viewport(375,667)
    //     cy.visit('/')
    //     cy.contains("Safari").should("not.be.visible");
        
    // });

    // it('Usando el viewport desktop using preset', () => {

    //     cy.viewport("macbook-15")
    //     cy.visit('/')
    //     cy.contains("Safari").should("exist");
        
    // });

    // it('Usando el viewport movil using preset', () => {

    //     cy.viewport("iphone-6+")
    //     cy.visit('/')
    //     cy.contains("Safari").should("not.be.visible");
        
    // });
    
    DEVICES.forEach(device =>{

        it(`Pruebas con el viewport ${device.viewport}`, () => {

            //Seteando el viewport dependiendo del arreglo DEVICES
            if(Cypress._.isArray(device.viewport)){
                cy.viewport(device.viewport[0],device.viewport[1])
            } else{
                cy.viewport(device.viewport)
            }

            cy.visit('/')

            //Validando si es desktop o movil
            if(device.type == 'desktop'){
               cy.contains("Safari").should("exist");
            } else{
                cy.contains("Safari").should("not.be.visible");
            } 
        });
    })

});