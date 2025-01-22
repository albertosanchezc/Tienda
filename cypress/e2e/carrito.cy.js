describe('Carrito', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/carrito')

        // Captura de la página completa
        cy.getByData("modal__close")
        cy.getByData("modal__close").click()

    })


    it(" 1: Mostrar Carrito Vacío", () => {
        cy.getByData("botonBusquedaManual").should('be.visible')
        cy.getByData("botonBusquedaNombre").should('be.visible')
        cy.getByData("botonPagar").should('be.visible')
        cy.getByData("cantidadArticulosTxt").should('be.visible')
        cy.getByData("numeroArticulos").should('be.visible')
        cy.getByData("Cantidadtotal").should('be.visible')
        cy.getByData("contenedorDetalles").should('be.visible')
    })

    it("2: Abrir ventana modal manual", () => {
        cy.getByData("botonBusquedaManual").should('be.visible')
        cy.getByData("botonBusquedaNombre").should('be.visible')
        cy.getByData("botonPagar").should('be.visible')
        cy.getByData("cantidadArticulosTxt").should('be.visible')
        cy.getByData("numeroArticulos").should('be.visible')
        cy.getByData("Cantidadtotal").should('be.visible')
        cy.getByData("contenedorDetalles").should('be.visible')
        // Después de revisar el carrito vacío

        cy.getByData("botonBusquedaManual").click()
        cy.getByData("modal--manual__close").should('exist')
    })


    it("3: Llenar el select de busqueda manual", () => {
        cy.getByData("botonBusquedaManual").should('be.visible')
        cy.getByData("botonBusquedaNombre").should('be.visible')
        cy.getByData("botonPagar").should('be.visible')
        cy.getByData("cantidadArticulosTxt").should('be.visible')
        cy.getByData("numeroArticulos").should('be.visible')
        cy.getByData("Cantidadtotal").should('be.visible')
        cy.getByData("contenedorDetalles").should('be.visible')
        // Después de revisar el carrito vacío


        cy.getByData("botonBusquedaManual").click()
        cy.getByData("modal--manual__close").should('exist')
        cy.getByData("modal--manual__close").type("7501")
    })

    it("4: Abrir ventana modal nombre", () => {
        cy.getByData("botonBusquedaManual").should('be.visible')
        cy.getByData("botonBusquedaNombre").should('be.visible')
        cy.getByData("botonPagar").should('be.visible')
        cy.getByData("cantidadArticulosTxt").should('be.visible')
        cy.getByData("numeroArticulos").should('be.visible')
        cy.getByData("Cantidadtotal").should('be.visible')
        cy.getByData("contenedorDetalles").should('be.visible')
        // Después de revisar el carrito vacío


        cy.getByData("botonBusquedaNombre").click()
        cy.getByData("modal--manual__close").should('not.be.visible')
        cy.getByData("modal--nombre__close").should('be.visible')
    })

    it("5: Llenar el select de busqueda por nombre", () => {
        cy.getByData("botonBusquedaManual").should('be.visible')
        cy.getByData("botonBusquedaNombre").should('be.visible')
        cy.getByData("botonPagar").should('be.visible')
        cy.getByData("cantidadArticulosTxt").should('be.visible')
        cy.getByData("numeroArticulos").should('be.visible')
        cy.getByData("Cantidadtotal").should('be.visible')
        cy.getByData("contenedorDetalles").should('be.visible')
        // Después de revisar el carrito vacío


        cy.getByData("botonBusquedaNombre").click()
        cy.getByData("modal--nombre__close").should('exist')
        cy.getByData("modal--nombre__close").type("coc")
        cy.getByData("modal--nombre__close").should('have.value', 'coc');

    })

    it("6: Llenar el select de busqueda por nombre y cerrar la modal sin seleccionar nada", () => {
        cy.getByData("botonBusquedaManual").should('be.visible')
        cy.getByData("botonBusquedaNombre").should('be.visible')
        cy.getByData("botonPagar").should('be.visible')
        cy.getByData("cantidadArticulosTxt").should('be.visible')
        cy.getByData("numeroArticulos").should('be.visible')
        cy.getByData("Cantidadtotal").should('be.visible')
        cy.getByData("contenedorDetalles").should('be.visible')
        // Después de revisar el carrito vacío


        cy.getByData("botonBusquedaNombre").click()
        cy.getByData("modal--nombre__close").should('exist')
        cy.getByData("modal--nombre__close").should('exist')
        cy.getByData("modal--nombre__close").type("coc")
        cy.getByData("modal--nombre__close").should('have.value', 'coc');
        cy.getByData("botonCerrarModalNombre")
        cy.getByData("botonCerrarModalNombre").should('exist')
        cy.getByData("botonCerrarModalNombre").click()



    })

    it("7: Abrir sin escribir algo y cerrar modal buscar por Código de barras ", () => {
        cy.getByData("botonBusquedaManual").should('be.visible')
        cy.getByData("botonBusquedaNombre").should('be.visible')
        cy.getByData("botonPagar").should('be.visible')
        cy.getByData("cantidadArticulosTxt").should('be.visible')
        cy.getByData("numeroArticulos").should('be.visible')
        cy.getByData("Cantidadtotal").should('be.visible')
        cy.getByData("contenedorDetalles").should('be.visible')
        // Después de revisar el carrito vacío

        // Abrir ventana modal busqueda por codigo de barras
        cy.getByData("botonBusquedaManual").should('exist');
        cy.getByData("botonBusquedaManual").click()

        // Cerrar ventana modal busqueda por codigo de barras
        cy.getByData("botonCerrarModalManual").should('exist')
        cy.getByData("botonCerrarModalManual").click()
    })

    it("8: Abrir sin escribir algo y cerrar modal buscar por nombre", () => {
        cy.getByData("botonBusquedaManual").should('be.visible')
        cy.getByData("botonBusquedaNombre").should('be.visible')
        cy.getByData("botonPagar").should('be.visible')
        cy.getByData("cantidadArticulosTxt").should('be.visible')
        cy.getByData("numeroArticulos").should('be.visible')
        cy.getByData("Cantidadtotal").should('be.visible')
        cy.getByData("contenedorDetalles").should('be.visible')
        // Después de revisar el carrito vacío

        // Abrir ventana modal busqueda por nombre
        cy.getByData("botonBusquedaNombre").click()
        cy.getByData("modal--nombre__close").should('exist')
        // Cerrar ventana modal busqueda por nombre
        cy.getByData("botonCerrarModalNombre").should('exist')
        cy.getByData("botonCerrarModalNombre").click()
    })

    it("9: Abrir escribir algo y cerrar modal buscar por Código de barras ", () => {
        cy.getByData("botonBusquedaManual").should('be.visible')
        cy.getByData("botonBusquedaNombre").should('be.visible')
        cy.getByData("botonPagar").should('be.visible')
        cy.getByData("cantidadArticulosTxt").should('be.visible')
        cy.getByData("numeroArticulos").should('be.visible')
        cy.getByData("Cantidadtotal").should('be.visible')
        cy.getByData("contenedorDetalles").should('be.visible')
        // Después de revisar el carrito vacío


        // Abrir ventana modal busqueda por nombre, escribir algo
        cy.getByData("botonBusquedaManual").click()
        cy.getByData("modal--manual__close").should('exist')
        cy.getByData("modal--manual__close").type("7501")

        // Cerrar ventana modal busqueda por codigo de barras
        cy.getByData("botonCerrarModalManual").should('exist')
        cy.getByData("botonCerrarModalManual").click()

    })

    it("10: Abrir escribir algo y cerrar modal buscar por nombre", () => {
        cy.getByData("botonBusquedaManual").should('be.visible')
        cy.getByData("botonBusquedaNombre").should('be.visible')
        cy.getByData("botonPagar").should('be.visible')
        cy.getByData("cantidadArticulosTxt").should('be.visible')
        cy.getByData("numeroArticulos").should('be.visible')
        cy.getByData("Cantidadtotal").should('be.visible')
        cy.getByData("contenedorDetalles").should('be.visible')
        // Después de revisar el carrito vacío

        // Abrir ventana modal buscar por nombre
        cy.getByData("botonBusquedaNombre").click()
        cy.getByData("modal--nombre__close").should('exist')
        // Escribir algo, cerrar ventana modal buscar por nombre
        cy.getByData("modal--nombre__close").type("coc")
        cy.getByData("botonCerrarModalNombre").click()


    })

    it("11: Abrir, escribir algo y cerrar modal buscar por Código de barras abrir modal de nuevo y ver que el input esté vacío", () => {
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
        cy.getByData("modal--manual__close").type("7501")

        // Cerrar ventana modal buscar por nombre
        cy.getByData("botonCerrarModalManual")
        cy.getByData("botonCerrarModalManual").click()

        // Abrir de nuevo la ventana modal, 
        cy.getByData("botonBusquedaManual").should('be.visible')
        cy.getByData("botonBusquedaManual").click()
        cy.getByData("modal--manual__close").should("exist")
        // Valores a revisar
        cy.getByData("modal--manual__close").should('not.have.value', 'coc');
        cy.getByData("modal--manual__close").should('not.have.value', '7501');

    })


    it("12: Abrir, escribir algo y cerrar modalbuscarpornombre abrir modal de nuevo y ver que el input esté vacío", () => {
        cy.getByData("botonBusquedaManual").should('be.visible')
        cy.getByData("botonBusquedaNombre").should('be.visible')
        cy.getByData("botonPagar").should('be.visible')
        cy.getByData("cantidadArticulosTxt").should('be.visible')
        cy.getByData("numeroArticulos").should('be.visible')
        cy.getByData("Cantidadtotal").should('be.visible')
        cy.getByData("contenedorDetalles").should('be.visible')
        // Después de revisar el carrito vacío


        // Abrir ventana modal buscar por nombre y escribir en ella
        cy.getByData("botonBusquedaNombre").click()
        cy.getByData("modal--nombre__close").should('exist')
        cy.getByData("modal--nombre__close").type("coc")

        // Cerrar ventana modal buscar por nombre
        cy.getByData("botonCerrarModalNombre")
        cy.getByData("botonCerrarModalNombre").click()

         // Abrir de nuevo la ventana modal,
        cy.getByData("botonBusquedaNombre").should('be.visible')
        cy.getByData("botonBusquedaNombre").click()
        cy.getByData("modal--nombre__close").should("exist")
        // Valores  arevisar
        cy.getByData("modal--nombre__close").should('not.have.value', '7501');
        cy.getByData("modal--nombre__close").should('not.have.value', 'coc');

    })

    it("13: Abrir modal busqueda codigo barras manual, hacer una búsqueda que no arroje resultados", () => {
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
        cy.getByData("modal--manual__close").type("coc")

    })


    it("14: Abrir modal busqueda por nombre, hacer una búsqueda que no arroje resultados", () => {
        cy.getByData("botonBusquedaManual").should('be.visible')
        cy.getByData("botonBusquedaNombre").should('be.visible')
        cy.getByData("botonPagar").should('be.visible')
        cy.getByData("cantidadArticulosTxt").should('be.visible')
        cy.getByData("numeroArticulos").should('be.visible')
        cy.getByData("Cantidadtotal").should('be.visible')
        cy.getByData("contenedorDetalles").should('be.visible')
        // Después de revisar el carrito vacío


        // Abrir ventana modal buscar por nombre y escribir en ella
        cy.getByData("botonBusquedaNombre").click()
        cy.getByData("modal--nombre__close").should('exist')
        cy.getByData("modal--nombre__close").type("7501")

    })


    it("15: Abrir, escribir algo y comprobar que se esté filtrando correctamente", () => {
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
        cy.getByData("modal--manual__close").type("7501")


        // Abrir de nuevo la ventana modal
        cy.getByData("nombreProductoTbody").should("exist")
        cy.getByData("descripcionProductoTbody").should("exist")
        cy.getByData("cantidadProductoTbody").should("exist")
        cy.getByData("precioUnitarioVentaProductoTbody").should("exist")


        // Valores a revisar
        cy.getByData("modal--manual__close").should('have.value', '7501')
        

        cy.wait(1000).getByData("nombreProductoTbody").should('have.text', 'Coca-Cola')
        cy.getByData("descripcionProductoTbody").should('have.text', '1.75 L')
        cy.getByData("precioUnitarioVentaProductoTbody").should('have.text', '$38.00')
        cy.getByData("cantidadProductoTbody").should('have.text', '1')


        // Cerrar ventana modal buscar por nombre
        // cy.getByData("botonCerrarModalManual")
        // cy.getByData("botonCerrarModalManual").click()


    })


    it("16: Abrir, escribir algo y selelccionar una opción", () => {
        cy.getByData("botonBusquedaManual").should('be.visible')
        cy.getByData("botonBusquedaNombre").should('be.visible')
        cy.getByData("botonPagar").should('be.visible')
        cy.getByData("cantidadArticulosTxt").should('be.visible')
        cy.getByData("numeroArticulos").should('be.visible')
        cy.getByData("Cantidadtotal").should('be.visible')
        cy.getByData("contenedorDetalles").should('be.visible')
        // Después de revisar el carrito vacío


        // Abrir ventana modal buscar por nombre y escribir en ella
        cy.getByData("botonBusquedaNombre").click()
        cy.getByData("modal--nombre__close").should('exist')
        cy.getByData("modal--nombre__close").type("coc")

        // Valores  arevisar
        cy.getByData("nombreProductoTbody").should('exist')
        cy.getByData("nombreProductoTbody").should('have.text', 'Coca-Cola')
        cy.getByData("nombreProductoTbody").click()
    })

})