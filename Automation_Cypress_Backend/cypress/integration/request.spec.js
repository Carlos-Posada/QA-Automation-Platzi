describe('Probando requests', () => {
    
    it('Debe de crear un empleado', function() {
        // DO a post request
        cy.request({
          url: "employees",
          method: "POST",
          body: {
            first_name: "Prueba",
            last_name: "Desarrollador",
            email: "aa@cc.com",
          },
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property("id")
            
            //Guardar el id del empleado para utilizarlo en otras pruebas.
            const id = response.body.id
            cy.wrap(id).as("id")
        })
    })

    it('Validar que se haya creado en la base de datos', function() {

        cy.request("GET","employees").then((response) =>{
            //Validate that the last record was created
            expect(response.body[response.body.length -1].first_name).to.eq("Prueba")
        })
    });

    it('Modificar al empleado con un nuevo correo', function () {

        // //Fist Option:
        // cy.request("GET","employees").then((response) =>{
        //     //Validate that the last record was created
        //     const lastEmployeeId = response.body[response.body.length -1].id
        //     cy.request({
        //         url: `employees/${lastEmployeeId}`,
        //         method: "PUT",
        //         body: {
        //             first_name: "Pepito",
        //             last_name: "Desarrollador",
        //             email: "nuevo@correo.com",
        //         }
        //     }).then ((response) => {
        //         cy.log(response) //log -> es para ver la Rta
        //         expect(response.status).to.eq(200)
        //         expect(response.body).to.have.property("id")
        //     })
        // })

        //Second Option:
        cy.request({
            url: `employees/${this.id}`,
            method: "PUT",
            body: {
                first_name: "Carlos",
                last_name: "QA engineer & Testing",
                email: "carlos.jest@correo.com",
            }
        }).then((response) => {
            cy.log(response) //log -> es para ver la Rta
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property("id")
        })
        
    });

    it('Borrando registro', function () {

        cy.request({
            url: `employees/${this.id}`,
            method: "DELETE",
        }).then((response) => {
            expect(response.status).to.eq(200)
        }) 
    });
})