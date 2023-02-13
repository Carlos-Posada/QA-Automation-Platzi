describe('Crear una tarea', function () {
    //¿Qué haríamos si quisieramos conservar el localstorage
    this.beforeEach( () => {
        //A traves de la UI
        // cy.visit("https://todo-cypress-iota.vercel.app");
        // cy.get("#title").type("Titulo de prueba");
        // cy.get("#description").type("Descripción de prueba");
        // cy.contains("Create").click();

        //atraves del localstorage
        cy.session("sesión del todo", () => {
           cy.visit("https://todo-cypress-iota.vercel.app").then(() => {
               localStorage.setItem("react_todo_ids",JSON.stringify(["Titulo de prueba"]));
               localStorage.setItem("Titulo de prueba",JSON.stringify({
                   title:"Titulo de prueba",
                   id: "Titulo de prueba",
                   complete: false,
                   description: "Descripción de una prueba de tarea"
               }));
           });
        });
        cy.visit("https://todo-cypress-iota.vercel.app")
    });

    it('Crear una tarea, removerla y limpiar el localStorage', function () {

        //Visit page
        //cy.visit("https://todo-cypress-iota.vercel.app");
        //Create task
        // cy.get("#title").type("Titulo de prueba");
        // cy.get("#description").type("Descripción de prueba");
        // cy.contains("Create").click();
        cy.contains("Titulo de prueba");
        cy.reload();
        cy.contains("Titulo de prueba").then(() => {
            expect(localStorage.getItem("Titulo de prueba")).to.exist;
        });
        //Remove task
        cy.contains("Remove").click().then(() => {
            expect(localStorage.getItem("Titulo de prueba")).to.not.exist;
        });
        //Clean localStorage
        // cy.clearLocalStorage("Titulo de prueba").should(ls =>{
        //     expect(ls.getItem("prop1")).to.be.null;
        // });
    }); 

    //Este it falla porque cypress automaticamente limpia el localstorage.
    it('Valido que la tarea se creo correctamente', function () {
        
        //cy.visit("https://todo-cypress-iota.vercel.app");
        expect(localStorage.getItem("Titulo de prueba")).to.exist;
    });
});