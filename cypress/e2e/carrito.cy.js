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

    context('Añadir producto con modal código barras', () => {
        beforeEach(() => {
            // preparar el entorno para añadir productos

            cy.getByData("botonBusquedaManual").click()
            cy.getByData("modal--manual__close").should('exist')
        })

        describe('Pruebas a modal', () => {
            it("Debería poder Cerrar la ventana modal manual sin haber escrito en ella", () => {
                // Cerrar ventana modal busqueda por codigo de barras
                cy.getByData("botonCerrarModalManual").should('exist')
                cy.getByData("botonCerrarModalManual").click()
            })




            describe("Si se hace una búsqueda por letras en código de barras", () => {
                it("No debe arrojar resultados", () => {
                    cy.getByData("modal--manual__close").should('exist')
                    cy.getByData("modal--manual__close").type("coc")
                })

            })





            describe('Si se busca un producto existente', () => {
                it("Debe mostrar el producto", () => {

                    cy.getByData("modal--manual__close").should('exist')
                    cy.getByData("modal--manual__close").type("75078843")

                    cy.getByData("nombreProductoTbodyModalManual").should("exist")
                    cy.getByData("descripcionProductoTbodyModalManual").should("exist")
                    cy.getByData("precioUnitarioVentaProductoTbodyModalManual").should("exist")

                    cy.getByData("modal--manual__close").should('have.value', '75078843')

                    cy.getByData("nombreProductoTbodyModalManual").contains('Cigarros Shots Classics')
                    cy.getByData("descripcionProductoTbodyModalManual").contains('20')
                    cy.getByData("precioUnitarioVentaProductoTbodyModalManual").contains('$50.48')
                    cy.getByData("imagenProductoTbodyModalManual").should('not.have.text', '4')
                })

                it("Debería poder escribir en el input y cerrar la modal", () => {
                    cy.getByData("modal--manual__close").should('exist')
                    cy.getByData("modal--manual__close").type("7507")
                    cy.screenshot('Debe estar escrito en el input 7507', {
                        capture: 'viewport',            // Define qué parte capturar
                        disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                        scale: true,                     // Escala la imagen en pantallas con alta resolución
                        timout: 5000,                     // Espera hasta 5 segundos antes de 
                        overwrite: true
                        // capturar
                    })
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
                describe("Si se selecciona un producto por pieza", () => {
                    beforeEach(() => {
                        // Abrir ventana modal buscar por codigo de barras y escribir en ella
                        cy.getByData("modal--manual__close").should('exist')
                        cy.getByData("modal--manual__close").type("7507")
                        cy.getByData("descripcionProductoTbodyModalManual").should('exist')
                        cy.getByData("descripcionProductoTbodyModalManual").contains('20').click()
                    })
                    it("Se debe mostrar en el carrito", () => {
                        cy.getByData("idCarrito").should('exist')
                        cy.getByData("cantidadCarrito").should('exist')
                        cy.getByData("nombreCarrito").should('exist')
                        cy.getByData("descripcionCarrito").should('exist')
                        cy.getByData("codigoBarrasCarrito").should('exist')
                        cy.getByData("imgCarrito").should('exist')
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
                        cy.getByData("imgCarrito").should('exist')
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





            describe('Si se busca un producto existente', () => {
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


    context('Pruebas funcionalidad lector de  código barras', () => {
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
                    const codigoBarras = '7501526';
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
                        cy.getByData("idCarrito").contains('14')
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