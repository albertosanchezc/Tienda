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

    context('Añadir producto con lector de  código barras', () => {
        beforeEach(() => {
            cy.getByData("documento")
            cy.getByData("documento").type('75078843')
            cy.document().trigger("keydown", { key: "Enter", keyCode: 13, which: 13 })
            cy.getByData("idCarrito").should('exist')
            cy.getByData("cantidadCarrito").should('exist')
            cy.getByData("nombreCarrito").should('exist')
            cy.getByData("descripcionCarrito").should('exist')
            cy.getByData("codigoBarrasCarrito").should('exist')
            cy.getByData("imgCarrito").should('exist')
            
            cy.getByData("imgDetallesProducto").should('exist')
            cy.getByData("nombreDetallesProducto").should('exist')
            cy.getByData("descripcionDetallesProducto").should('exist')
            cy.getByData("cantidadDetallesProducto").should('exist')
            cy.getByData("precioVentaDetallesProducto").should('exist')
            cy.getByData("totalDetallesProducto").should('exist')
            
            cy.getByData("nombreDetallesProducto").contains('Cigarros Shots Classics')
            cy.getByData("descripcionDetallesProducto").contains('20')
            cy.getByData("cantidadDetallesProducto").contains('Cantidad: 1')
            cy.getByData("precioVentaDetallesProducto").contains('50.48')
            cy.getByData("totalDetallesProducto").contains('50.48')
            
        })

        describe("Si se escanea de nuevo el mismo producto", () => {
            it("Debe incrementar la cantidad", () => {
                cy.getByData("documento").type('75078843')
                cy.document().trigger("keydown", { key: "Enter", keyCode: 13, which: 13 })
                cy.getByData("idCarrito").contains('39')
                cy.getByData("cantidadCarrito").contains('2')
                cy.getByData("nombreCarrito").contains('Cigarros Shots Classics')
                cy.getByData("descripcionCarrito").contains('20')
                cy.getByData("codigoBarrasCarrito").contains('75078843')
                cy.getByData("imgCarrito").should('exist')


                cy.getByData("Cantidadtotal").contains('100.96')
                cy.getByData("numeroArticulos").contains('2')

                cy.getByData("nombreDetallesProducto").contains('Cigarros Shots Classics')
                cy.getByData("descripcionDetallesProducto").contains('20')
                cy.getByData("cantidadDetallesProducto").contains('Cantidad: 2')
                cy.getByData("precioVentaDetallesProducto").contains('50.48')
                cy.getByData("totalDetallesProducto").contains('100.96')

            })
        })

        describe("Si se escanea un producto que no está registrado", () => {
            it("Debe mostrar la alerta", () => {
                cy.getByData("documento").type('549878205')
                cy.document().trigger("keydown", { key: "Enter", keyCode: 13, which: 13 })

            })
        })

        describe("Si se escanea otro producto", () => {
            it("Debe añadir ese producto al carrito", () => {
                cy.getByData("documento").type('7501055313532')
                cy.document().trigger("keydown", { key: "Enter", keyCode: 13, which: 13 })
                cy.getByData("idCarrito").contains('1')
                cy.getByData("cantidadCarrito").contains('1')
                cy.getByData("nombreCarrito").contains('Coca-Cola')
                cy.getByData("descripcionCarrito").contains('1.75 L')
                cy.getByData("codigoBarrasCarrito").contains('7501055313532')
                cy.getByData("imgCarrito").should('exist')
            })
        })
    })


})