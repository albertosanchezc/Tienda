describe('Pruebas del carrito de compras', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3004/carrito')

        // Captura de la página completa
        cy.getByData("modal__close")
        cy.getByData("modal__close").click()
        cy.getByData("botonBusquedaManual").should('be.visible')
        cy.getByData("botonBusquedaNombre").should('be.visible')
        cy.getByData("botonPagar").should('be.visible')
        cy.getByData("cantidadArticulosTxt").should('be.visible')
        cy.getByData("numeroArticulos").should('be.visible')
        cy.getByData("Cantidadtotal").should('be.visible')
        cy.getByData("contenedorDetalles").should('be.visible')

    })

    context('Añadir producto con modal nombre', () => {
        beforeEach(() => {
            // preparar el entorno para añadir productos

            cy.getByData("botonBusquedaNombre").click()
            cy.getByData("modal--nombre__close").should('be.visible')
        })

        describe('Pruebas a modal', () => {
            it("Debería poder Cerrar la ventana modal nombre sin haber escrito en ella", () => {
                // Cerrar ventana modal busqueda por codigo de barras
                cy.getByData("botonCerrarModalNombre").should('be.visible')
                cy.getByData("botonCerrarModalNombre").click()
            })




            describe("Si se hace una búsqueda por codigo de barras en nombre", () => {
                it("No debe arrojar resultados", () => {
                    cy.getByData("modal--nombre__close").should('be.visible')
                    cy.getByData("modal--nombre__close").type("7507")
                })

            })





            describe('Si se busca un producto be.visibleente', () => {
                it("Debe mostrar el producto", () => {

                    cy.getByData("modal--nombre__close").should('be.visible')
                    cy.getByData("modal--nombre__close").type("cig")

                    cy.getByData("descripcionProductoTbodyModalNombre").contains('20')

                    cy.getByData("modal--nombre__close").should('not.have.value', '75078843')
                    cy.getByData("modal--nombre__close").should('have.value', 'cig')


                    cy.getByData("nombreProductoTbodyModalManual").contains('Cigarros Shots Classics')
                    cy.getByData("descripcionProductoTbodyModalManual").contains('20')
                    cy.getByData("precioUnitarioVentaProductoTbodyModalManual").contains('$50.48')
                    cy.getByData("imagenProductoTbodyModalManual").should('not.have.text', '4')
                })

                it("Debería poder escribir en el input y cerrar la modal", () => {
                    cy.getByData("modal--nombre__close").should('be.visible')
                    cy.getByData("modal--nombre__close").type("cig")
                    cy.screenshot('Debe estar escrito en el input cig', {
                        capture: 'viewport',            // Define qué parte capturar
                        disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                        scale: true,                     // Escala la imagen en pantallas con alta resolución
                        timout: 5000,                     // Espera hasta 5 segundos antes de 
                        overwrite: true
                        // capturar
                    })
                    // Cerrar ventana modal busqueda por nombre
                    cy.getByData("botonCerrarModalNombre").should('be.visible')
                    cy.getByData("botonCerrarModalNombre").click()
                })

                it("Debe estar vacío el input de la otra modal al cerrar modalManual sin dar click en un producto", () => {
                    cy.getByData("modal--nombre__close").should('be.visible')
                    cy.getByData("modal--nombre__close").type("cig")

                    // Cerrar ventana modal busqueda por nombre
                    cy.getByData("botonCerrarModalNombre").should('be.visible')
                    cy.getByData("botonCerrarModalNombre").click()

                    // Abrir de nuevo la ventana modal, 
                    cy.getByData("botonBusquedaNombre").should('be.visible')
                    cy.getByData("botonBusquedaNombre").click()
                    cy.getByData("modal--nombre__close").should("be.visible")
                    // Valores a revisar
                    cy.getByData("modal--nombre__close").should('not.have.value', 'coc');
                    cy.getByData("modal--nombre__close").should('not.have.value', '7507');
                })
                it("También el input de esta modal debe  estar vacío  si se cierra la modal sin dar click en un producto", () => {
                    cy.getByData("modal--nombre__close").should('be.visible')
                    cy.getByData("modal--nombre__close").type("cig")

                    // Cerrar ventana modal busqueda por nombre
                    cy.getByData("botonCerrarModalNombre").should('be.visible')
                    cy.getByData("botonCerrarModalNombre").click()

                    // Abrir de nuevo la ventana modal, 
                    cy.getByData("botonBusquedaNombre").should('be.visible')
                    cy.getByData("botonBusquedaNombre").click()
                    cy.getByData("modal--nombre__close").should("be.visible")
                    // Valores a revisar
                    cy.getByData("modal--nombre__close").should('not.have.value', 'coc');
                    cy.getByData("modal--nombre__close").should('not.have.value', '7507');

                })
                describe("Si se selecciona un producto por pieza", () => {
                    beforeEach(() => {
                        // Abrir ventana modal buscar por codigo de barras y escribir en ella
                        cy.getByData("modal--nombre__close").should('be.visible')
                        cy.getByData("modal--nombre__close").type("cig")
                        cy.getByData("descripcionProductoTbodyModalNombre").should('be.visible')
                        cy.getByData("descripcionProductoTbodyModalNombre").contains('20').click()
                    })
                    it("Se debe mostrar en el carrito", () => {
                        cy.getByData("idCarrito").should('exist')
                        cy.getByData("cantidadCarrito").should('be.visible')
                        cy.getByData("nombreCarrito").should('be.visible')
                        cy.getByData("descripcionCarrito").should('be.visible')
                        cy.getByData("codigoBarrasCarrito").should('be.visible')
                        cy.getByData("imgCarrito").should('be.visible')
                        cy.screenshot('Mostrar en el carrito', {
                            capture: 'viewport',            // Define qué parte capturar
                            disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                            scale: true,                     // Escala la imagen en pantallas con alta resolución
                            timeout: 5000,                     // Espera hasta 5 segundos antes de capturar
                            overwrite: true
                        })
                    })

                    it("Debe tener los valores correcto en el carrito", () => {
                        cy.getByData("idCarrito").contains('39')
                        cy.getByData("cantidadCarrito").contains('1')
                        cy.getByData("nombreCarrito").contains('Cigarros Shots Classics')
                        cy.getByData("descripcionCarrito").contains('20')
                        cy.getByData("codigoBarrasCarrito").contains('75078843')
                        cy.getByData("imgCarrito").should('be.visible')
                        cy.screenshot('Debe tener los valores correctos', {
                            capture: 'runner',            // Define qué parte capturar
                            disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                            scale: true,                     // Escala la imagen en pantallas con alta resolución
                            timeout: 5000,                     // Espera hasta 5 segundos antes de capturar
                            overwrite: true
                        })


                        const precio = 50.48;
                        const cantidad = 1;
                        const nombre = 'Cigarros Shots Classics';
                        const descripcion = '20'
                        const total = (precio * cantidad);

                        cy.getByData("nombreDetallesProducto").contains(`${nombre}`)
                        cy.getByData("descripcionDetallesProducto").contains(`${descripcion}`)
                        cy.getByData("cantidadDetallesProducto").contains(`Cantidad: ${cantidad}`)
                        cy.getByData("precioVentaDetallesProducto").contains(`${precio}`)
                        cy.getByData("totalDetallesProducto").contains(`${total}`)

                        const totalCarrito = total;
                        cy.getByData("Cantidadtotal").contains(`$${totalCarrito}`)
                        cy.getByData("numeroArticulos").contains('1')
                    })
                    
                })

            })
        })


    })


})