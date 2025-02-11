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

    context('Pruebas funcionalidad lector de código barras', () => {
        beforeEach(() => {
            cy.getByData("documento")
            cy.getByData("documento").type('75078843')
            cy.document().trigger("keydown", { key: "Enter", keyCode: 13, which: 13 })
            cy.getByData("idCarrito").should('not.be.visible')
            cy.getByData("cantidadCarrito").should('be.visible')
            cy.getByData("nombreCarrito").should('be.visible')
            cy.getByData("descripcionCarrito").should('be.visible')
            cy.getByData("codigoBarrasCarrito").should('be.visible')
            cy.getByData("imgCarrito").should('be.visible')

            cy.getByData("imgDetallesProducto").should('be.visible')
            cy.getByData("nombreDetallesProducto").should('be.visible')
            cy.getByData("descripcionDetallesProducto").should('be.visible')
            cy.getByData("cantidadDetallesProducto").should('be.visible')
            cy.getByData("precioVentaDetallesProducto").should('be.visible')
            cy.getByData("totalDetallesProducto").should('be.visible')

            cy.getByData("nombreDetallesProducto").contains('Cigarros Shots Classics')
            cy.getByData("descripcionDetallesProducto").contains('20')
            cy.getByData("cantidadDetallesProducto").contains('Cantidad: 1')
            cy.getByData("precioVentaDetallesProducto").contains('50.48')
            cy.getByData("totalDetallesProducto").contains('50.48')

        })
        describe("Pruebas al lector de código de barras", () => {


            describe("Si se escanea un producto que no está registrado", () => {
                it("No debe arrojar resultados", () => {
                    cy.getByData("documento").type('549878205')
                    cy.document().trigger("keydown", { key: "Enter", keyCode: 13, which: 13 })
                    cy.screenshot('No resultados lector código', {
                        capture: 'viewport',            // Define qué parte capturar
                        disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                        scale: true,                     // Escala la imagen en pantallas con alta resolución
                        timout: 1000,                     // Espera hasta 5 segundos antes de 
                        overwrite: true
                        // capturar
                    })
                })
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


            describe("Si se escanea otro producto por pieza", () => {
                beforeEach(() => {
                    cy.getByData("documento").type('7501055313532')
                    cy.document().trigger("keydown", { key: "Enter", keyCode: 13, which: 13 })
                })
                it("Debe añadir ese producto al carrito", () => {

                    cy.getByData("idCarrito").contains('1')
                    cy.getByData("cantidadCarrito").contains('1')
                    cy.getByData("nombreCarrito").contains('Coca-Cola')
                    cy.getByData("descripcionCarrito").contains('1.75 L')
                    cy.getByData("codigoBarrasCarrito").contains('7501055313532')
                    cy.getByData("imgCarrito").should('exist')
                })

                it("Debe poder editar cantidad y actualizar la tabla", () => {

                    const precio = 37.50;
                    const cantidad = 3;
                    const nombre = 'Coca-Cola';
                    const descripcion = '1.75 L'
                    const total = (precio * cantidad);

                    cy.getByData("editar-cantidad-1").click()
                    cy.getByData('cantidadTablaModalCantidad').contains(`1`)
                    cy.getByData('nombreTablaModalCantidad').contains(`${nombre}`)
                    cy.getByData('descripcionTablaModalCantidad').contains(`${descripcion}`)
                    cy.getByData('precioVentaTablaModalCantidad').contains(`$${precio}`)
                    cy.getByData('totalTablaModalCantidad').contains(`${precio}`)
                    cy.getByData('modal--cantidad__close').type('3');

                    cy.getByData('cantidadTablaModalCantidad').contains(`${cantidad}`)
                    cy.getByData('nombreTablaModalCantidad').contains(`${nombre}`)
                    cy.getByData('descripcionTablaModalCantidad').contains(`${descripcion}`)
                    cy.getByData('precioVentaTablaModalCantidad').contains(`$${precio}`)
                    cy.getByData('totalTablaModalCantidad').contains(`$${total}`)
                    cy.getByData("botonConfirmarCantidadModalCantidad").click()

                    cy.getByData("idCarrito").contains('1')
                    cy.getByData("cantidadCarrito").contains('3')
                    cy.getByData("nombreCarrito").contains('Coca-Cola')
                    cy.getByData("descripcionCarrito").contains('1.75 L')
                    cy.getByData("codigoBarrasCarrito").contains('7501055313532')
                    cy.getByData("imgCarrito").should('exist')

                    cy.getByData("nombreDetallesProducto").contains(`${nombre}`)
                    cy.getByData("descripcionDetallesProducto").contains(`${descripcion}`)
                    cy.getByData("cantidadDetallesProducto").contains(`Cantidad: ${cantidad}`)
                    cy.getByData("precioVentaDetallesProducto").contains(`${precio}`)
                    cy.getByData("totalDetallesProducto").contains(`${total}`)

                    const totalCarrito = total + 50.48;
                    cy.getByData("Cantidadtotal").contains(`$${totalCarrito}`)
                    cy.getByData("numeroArticulos").contains('4')
                })
            })

            describe("Si se escanea un producto a granel", () => {
                beforeEach(() => {
                    cy.getByData("documento").type('7501526')
                    cy.getByData('modalGranel').should('not.be.visible');

                    cy.document().trigger("keydown", { key: "Enter", keyCode: 13, which: 13 })

                })

                it("Debe Abrir la modal de granel y tener los valores correctos", () => {
                    const precio = 30;
                    const cantidad = 100;
                    const nombre = 'Jamón';
                    const descripcion = 'Fud'
                    const total = (precio * cantidad) / 1000;
                    const codigoBarras = '7501526';
                    cy.getByData('modalGranel').should('be.visible');
                    cy.getByData('cantidadTablaModalGranel').contains(`1`)
                    cy.getByData('nombreTablaModalGranel').contains(`${nombre}`)
                    cy.getByData('descripcionTablaModalGranel').contains(`${descripcion}`)
                    cy.getByData('precioKiloTablaModalGranel').contains(`$${precio}`)
                    cy.getByData('totalTablaModalGranel').contains(`${total}`)
                })

                describe("Si se edita la cantidad", () => {
                    beforeEach(() => {
                        const precio = 30;
                        const cantidad = 100;
                        const nombre = 'Jamón';
                        const descripcion = 'Fud'
                        const total = (precio * cantidad) / 1000;
                        cy.getByData('modal--granel__close').type(`${cantidad}`);
                        cy.getByData('cantidadTablaModalGranel').contains(`${cantidad}`)
                        cy.getByData('nombreTablaModalGranel').contains(`${nombre}`)
                        cy.getByData('descripcionTablaModalGranel').contains(`${descripcion}`)
                        cy.getByData('precioKiloTablaModalGranel').contains(`$${precio}`)
                        cy.getByData('totalTablaModalGranel').contains(`$${total}`)
                        cy.getByData('totalmodalGranel').contains(`$${total}`)
                    })

                    it("Debe actualizarse la modal", () => {
                        const precio = 30;
                        const cantidad = 100;
                        const nombre = 'Jamón';
                        const descripcion = 'Fud'
                        const total = (precio * cantidad) / 1000;
                        const codigoBarras = '7501526';

                        cy.getByData('cantidadTablaModalGranel').contains(`${cantidad}`)
                        cy.getByData('nombreTablaModalGranel').contains(`${nombre}`)
                        cy.getByData('descripcionTablaModalGranel').contains(`${descripcion}`)
                        cy.getByData('precioKiloTablaModalGranel').contains(`$${precio}`)
                        cy.getByData('totalTablaModalGranel').contains(`$${total}`)
                        cy.getByData('totalmodalGranel').contains(`$${total}`)

                        // const totalCarrito = total + 50.48;
                        // cy.getByData("Cantidadtotal").contains(`$${totalCarrito}`)
                        // cy.getByData("numeroArticulos").contains('4')
                    })

                    describe("Si se da click en confirmar", () => {
                        beforeEach(() => {
                            cy.getByData("botonConfirmarCantidadModalGranel").click()

                        })

                        it("Debe actualizarse el carrito", () => {

                            const precio = 30;
                            const cantidad = 100;
                            const nombre = 'Jamón';
                            const descripcion = 'Fud'
                            const total = (precio * cantidad) / 1000;
                            const codigoBarras = '7501526';
                            cy.getByData("cantidadCarrito").contains(`${cantidad}`)
                            cy.getByData("nombreCarrito").contains(`${nombre}`)
                            cy.getByData("descripcionCarrito").contains(`${descripcion}`)
                            cy.getByData("codigoBarrasCarrito").contains(`${codigoBarras}`)
                            cy.getByData("imgCarrito").should('exist')


                        })

                        it("Deben actualizarse los detalles Producto", () => {

                            const precio = 30;
                            const cantidad = 100;
                            const nombre = 'Jamón';
                            const descripcion = 'Fud'
                            const total = (precio * cantidad) / 1000;
                            const codigoBarras = '7501526';
                            cy.getByData("nombreDetallesProducto").contains(`${nombre}`)
                            cy.getByData("descripcionDetallesProducto").contains(`${descripcion}`)
                            cy.getByData("cantidadDetallesProducto").contains(`Cantidad: ${cantidad}g`)
                            cy.getByData("precioVentaDetallesProducto").contains(`$${precio}`)
                            cy.getByData("totalDetallesProducto").contains(`$${total}`)


                        })
                    })

                })

            })
        })

    })

})