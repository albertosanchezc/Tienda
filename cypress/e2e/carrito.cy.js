describe('Pruebas del carrito de compras', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/carrito')

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

    context('Buscar producto con modal código barras', () => {
        beforeEach(() => {
            // preparar el entorno para añadir productos

            cy.getByData("botonBusquedaManual").click()
            cy.getByData("modal--manual__close").should('exist')
        })
        it("Debería Filtrar por código de barras", () => {
            cy.getByData("modal--manual__close").should('exist')
            cy.getByData("modal--manual__close").type("7507")

            cy.getByData("nombreProductoTbodyModalManual").should("exist")
            cy.getByData("descripcionProductoTbodyModalManual").should("exist")
            cy.getByData("precioUnitarioVentaProductoTbodyModalManual").should("exist")

            cy.getByData("modal--manual__close").should('have.value', '7507')


            cy.getByData("nombreProductoTbodyModalManual").should('have.text', 'Cigarros Shots Classics')
            cy.getByData("descripcionProductoTbodyModalManual").should('have.text', '20')
            cy.getByData("precioUnitarioVentaProductoTbodyModalManual").should('have.text', '$50.48')
            cy.getByData("cantidadProductoTbodyModalManual").should('have.text', '4')
        })

        it("No debe arrojar resultados", () => {
            cy.getByData("modal--manual__close").should('exist')
            cy.getByData("modal--manual__close").type("coc")
        })

        it("Debería Cerrar la ventana modal manual sin haber escrito en ella", () => {
            // Cerrar ventana modal busqueda por codigo de barras
            cy.getByData("botonCerrarModalManual").should('exist')
            cy.getByData("botonCerrarModalManual").click()
        })

        it("Debería escribir en el input y cerrar la modal", () => {
            cy.getByData("modal--manual__close").should('exist')
            cy.getByData("modal--manual__close").type("7507")


            // Cerrar ventana modal busqueda por código de barras
            cy.getByData("botonCerrarModalManual").should('exist')
            cy.getByData("botonCerrarModalManual").click()
        })

        it("Debe estar vacío el input de la otra modal al cerrar modalManual sin dar click en un producto", () => {
            cy.getByData("modal--manual__close").should('exist')
            cy.getByData("modal--manual__close").type("7507")

            // Cerrar ventana modal busqueda por código de barras
            cy.getByData("botonCerrarModalManual").should('exist')
            cy.getByData("botonCerrarModalManual").click()

            // Abrir de nuevo la ventana modal, 
            cy.getByData("botonBusquedaNombre").should('be.visible')
            cy.getByData("botonBusquedaNombre").click()
            cy.getByData("modal--nombre__close").should("exist")
            // Valores a revisar
            cy.getByData("modal--nombre__close").should('not.have.value', 'coc');
            cy.getByData("modal--nombre__close").should('not.have.value', '7507');
        })

        it("También el input de esta modal debe  estar vacío  si se cierra la modal sin dar click en un producto", () => {
            cy.getByData("modal--manual__close").should('exist')
            cy.getByData("modal--manual__close").type("7507")

            // Cerrar ventana modal busqueda por código de barras
            cy.getByData("botonCerrarModalManual").should('exist')
            cy.getByData("botonCerrarModalManual").click()

            // Abrir de nuevo la ventana modal, 
            cy.getByData("botonBusquedaManual").should('be.visible')
            cy.getByData("botonBusquedaManual").click()
            cy.getByData("modal--manual__close").should("exist")
            // Valores a revisar
            cy.getByData("modal--manual__close").should('not.have.value', 'coc');
            cy.getByData("modal--manual__close").should('not.have.value', '7507');
        })

    })


    context('Buscar producto con modal nombre', () => {
        beforeEach(() => {
            // preparar el entorno para añadir productos

            cy.getByData("botonBusquedaNombre").click()
            cy.getByData("modal--nombre__close").should('exist')
        })

        it("No debe arrojar resultados", () => {
            cy.getByData("modal--nombre__close").should('exist')
            cy.getByData("modal--nombre__close").type("7501")
        })

        it("Debería Cerrar la ventana modal nombre sin haber escrito en ella", () => {
            // Cerrar ventana modal busqueda por codigo de barras
            cy.getByData("modal--nombre__close").should('exist')
            cy.getByData("botonCerrarModalNombre").should('exist')
            cy.getByData("botonCerrarModalNombre").click()
        })

        it("Debería escribir en el input y cerrar la modal", () => {
            // Abrir ventana modal buscar por nombre
            cy.getByData("modal--nombre__close").should('exist')
            // Escribir algo, cerrar ventana modal buscar por nombre
            cy.getByData("modal--nombre__close").type("cigc")
            cy.getByData("botonCerrarModalNombre").click()
        })

        it("Debe estar vacío el input de la otra modal al cerrar modalNombre sin dar click en un producto", () => {
            cy.getByData("modal--nombre__close").should('exist')
            cy.getByData("modal--nombre__close").type("cig")

            // Cerrar ventana modal busqueda por código de barras
            cy.getByData("botonCerrarModalNombre").should('exist')
            cy.getByData("botonCerrarModalNombre").click()

            // Abrir de nuevo la ventana modal, 
            cy.getByData("botonBusquedaManual").should('be.visible')
            cy.getByData("botonBusquedaManual").click()
            cy.getByData("modal--manual__close").should("exist")
            // Valores a revisar
            cy.getByData("modal--manual__close").should('not.have.value', 'coc');
            cy.getByData("modal--manual__close").should('not.have.value', '7507');
        })

        it("También el input de esta modal debe  estar vacío  si se cierra la modal sin dar click en un producto", () => {
            cy.getByData("modal--nombre__close").should('exist')
            cy.getByData("modal--nombre__close").type("cig")

            // Cerrar ventana modal busqueda por código de barras
            cy.getByData("botonCerrarModalNombre").should('exist')
            cy.getByData("botonCerrarModalNombre").click()

            // Abrir de nuevo la ventana modal, 
            cy.getByData("botonBusquedaNombre").should('be.visible')
            cy.getByData("botonBusquedaNombre").click()
            cy.getByData("modal--nombre__close").should("exist")
            // Valores a revisar
            cy.getByData("modal--nombre__close").should('not.have.value', 'coc');
            cy.getByData("modal--nombre__close").should('not.have.value', '7507');
        })

    })


    it("16: Abrir, escribir algo seleccionar una opción de cada modal filtrando", () => {
        cy.getByData("botonBusquedaManual").should('be.visible')
        cy.getByData("botonBusquedaNombre").should('be.visible')
        cy.getByData("botonPagar").should('be.visible')
        cy.getByData("cantidadArticulosTxt").should('be.visible')
        cy.getByData("numeroArticulos").should('be.visible')
        cy.getByData("Cantidadtotal").should('be.visible')
        cy.getByData("contenedorDetalles").should('be.visible')
        // Después de revisar el carrito vacío


        // Abrir ventana modal buscar por codigo de barras y escribir en ella
        cy.getByData("botonBusquedaManual").click()
        cy.getByData("modal--manual__close").should('exist')
        cy.getByData("modal--manual__close").type("7507")
        cy.getByData("descripcionProductoTbodyModalManual").contains('20').click()
        // Abrir ventana modal buscar por nombre y escribir en ella
        cy.getByData("botonBusquedaNombre").click()
        cy.getByData("modal--nombre__close").should('exist')
        cy.getByData("modal--nombre__close").type("cig")
        cy.getByData('descripcionProductoTbodyModalNombre')
        cy.getByData("descripcionProductoTbodyModalNombre").contains('20').click()
    })

})