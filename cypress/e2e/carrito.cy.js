describe('Pruebas del carrito de compras', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/carrito')

        // Captura de la página completa
        cy.getByData("documento").click(50, 30)
        cy.getByData("botonBusquedaManual").should('be.visible')
        cy.getByData("botonBusquedaNombre").should('be.visible')
        cy.getByData("botonPagar").should('be.visible')
        cy.getByData("cantidadArticulosTxt").should('be.visible')
        cy.getByData("numeroArticulos").should('be.visible')
        cy.getByData("Cantidadtotal").should('be.visible')
        cy.getByData("contenedorDetalles").should('be.visible')

    })

    context('Pruebas de funcionalidad modal código barras', () => {
        beforeEach(() => {
            // preparar el entorno para añadir productos

            cy.getByData("botonBusquedaManual").click()
            cy.getByData("modal--manual__close").should('exist')
            cy.screenshot('Abrir modal manual', {
                capture: 'viewport',            // Define qué parte capturar
                disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                scale: true,                     // Escala la imagen en pantallas con alta resolución
                timout: 1000,                     // Espera hasta 5 segundos antes de 
                overwrite: true
                // capturar
            })
        })

        describe('Pruebas a modal', () => {
            describe("Debería poder Cerrar la ventana modal manual sin haber escrito en ella", () => {
                it("Debería poder Cerrar la ventana modal manual con el botón", () => {
                    // Cerrar ventana modal busqueda por codigo de barras
                    cy.getByData("botonCerrarModalManual").should('exist')
                    cy.getByData("botonCerrarModalManual").click()

                })

                it("Debería poder Cerrar la ventana modal manual al dar click fuera de la modal", () => {
                    // Cerrar ventana modal busqueda por codigo de barras
                    cy.getByData("modal--manual").click(50, 30).should('not.be.visible')
                })
            })




            describe("Si se hace una búsqueda por letras en código de barras", () => {
                it("No debe arrojar resultados", () => {
                    cy.getByData("modal--manual__close").should('exist')
                    cy.getByData("modal--manual__close").type("coc")
                    cy.screenshot('No resultados modal manual', {
                        capture: 'viewport',            // Define qué parte capturar
                        disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                        scale: true,                     // Escala la imagen en pantallas con alta resolución
                        timout: 1000,                     // Espera hasta 5 segundos antes de 
                        overwrite: true
                        // capturar
                    })
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
                    cy.getByData("descripcionProductoTbodyModalManual").contains('25')
                    cy.getByData("precioUnitarioVentaProductoTbodyModalManual").contains('79')
                    cy.getByData("imagenProductoTbodyModalManual").should('not.have.text', '4')
                    cy.screenshot('Cigarros busqueda manual', {
                        capture: 'viewport',            // Define qué parte capturar
                        disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                        scale: true,                     // Escala la imagen en pantallas con alta resolución
                        timout: 1000,                     // Espera hasta 5 segundos antes de 
                        overwrite: true
                        // capturar
                    })
                })

                describe("Debería poder escribir en el input y cerrar la modal", () => {
                    it("Debería poder Cerrar la ventana modal manual con el botón", () => {
                        // Cerrar ventana modal busqueda por codigo de barras
                        cy.getByData("modal--manual__close").should('exist')
                        cy.getByData("modal--manual__close").type("7507")
                        // Cerrar ventana modal busqueda por código de barras
                        cy.getByData("botonCerrarModalManual").should('exist')
                        cy.getByData("botonCerrarModalManual").click()

                    })

                    it("Debería poder Cerrar la ventana modal manual al dar click fuera de la modal", () => {
                        // Cerrar ventana modal busqueda por codigo de barras
                        cy.getByData("modal--manual__close").should('exist')
                        cy.getByData("modal--manual__close").type("7507")
                        // Cerrar ventana modal busqueda por código de barras

                        cy.getByData("modal--manual").click(50, 30).should('not.be.visible')
                    })
                })

                describe("Debe estar vacío el input de la otra modal al cerrar modalManual sin dar click en un producto", () => {
                    it("Debería poder Cerrar la ventana modal manual con el botón", () => {
                        // Cerrar ventana modal busqueda por código de barras
                        cy.getByData("botonCerrarModalManual").should('exist')
                        cy.getByData("botonCerrarModalManual").click()

                        // Abrir de nuevo la ventana modal, 
                        cy.getByData("botonBusquedaNombre").should('be.visible')
                        cy.getByData("botonBusquedaNombre").click()
                        cy.getByData("modal--nombre__close").should("be.visible")
                        // Valores a revisar
                        cy.getByData("modal--nombre__close").should('not.have.value', 'coc');
                        cy.getByData("modal--nombre__close").should('not.have.value', 'cig');
                        cy.getByData("modal--nombre__close").should('not.have.value', '7507');
                        cy.screenshot('Input Reiniciado tras cerrar modal manual botón', {
                            capture: 'viewport',            // Define qué parte capturar
                            disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                            scale: true,                     // Escala la imagen en pantallas con alta resolución
                            timout: 1000,                     // Espera hasta 5 segundos antes de 
                            overwrite: true
                            // capturar
                        })


                    })

                    it("Debería poder Cerrar la ventana modal manual al dar click fuera de la modal", () => {
                        // Cerrar ventana modal busqueda por codigo de barras
                        cy.getByData("modal--manual__close").should('exist')
                        cy.getByData("modal--manual__close").type("7507")
                        // Cerrar ventana modal busqueda por código de barras

                        cy.getByData("modal--manual").click(50, 30).should('not.be.visible')


                        // Abrir de nuevo la ventana modal, 
                        cy.getByData("botonBusquedaNombre").should('be.visible')
                        cy.getByData("botonBusquedaNombre").click()
                        cy.getByData("modal--nombre__close").should("be.visible")
                        // Valores a revisar
                        cy.getByData("modal--nombre__close").should('not.have.value', 'coc');
                        cy.getByData("modal--nombre__close").should('not.have.value', 'cig');
                        cy.getByData("modal--nombre__close").should('not.have.value', '7507');
                        cy.screenshot('Input Reiniciado tras cerrar modal manual click fuera modal', {
                            capture: 'viewport',            // Define qué parte capturar
                            disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                            scale: true,                     // Escala la imagen en pantallas con alta resolución
                            timout: 1000,                     // Espera hasta 5 segundos antes de 
                            overwrite: true
                            // capturar
                        })



                    })
                })

                describe("También el input de esta modal debe  estar vacío  si se cierra la modal sin dar click en un producto", () => {
                    it("Debería poder Cerrar la ventana modal manual con el botón", () => {
                        // Cerrar ventana modal busqueda por código de barras
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
                        cy.screenshot('Input vacío en modal manual tras filtrar-cerrar modal manual boton', {
                            capture: 'viewport',            // Define qué parte capturar
                            disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                            scale: true,                     // Escala la imagen en pantallas con alta resolución
                            timout: 1000,                     // Espera hasta 5 segundos antes de 
                            overwrite: true
                            // capturar
                        })


                    })

                    it("Debería poder Cerrar la ventana modal manual al dar click fuera de la modal", () => {
                        // Cerrar ventana modal busqueda por codigo de barras
                        cy.getByData("modal--manual__close").should('exist')
                        cy.getByData("modal--manual__close").type("7507")
                        // Cerrar ventana modal busqueda por código de barras

                        cy.getByData("modal--manual").click(50, 30).should('not.be.visible')

                        // Abrir de nuevo la ventana modal, 
                        cy.getByData("botonBusquedaManual").should('be.visible')
                        cy.getByData("botonBusquedaManual").click()
                        cy.getByData("modal--manual__close").should("exist")
                        // Valores a revisar
                        cy.getByData("modal--manual__close").should('not.have.value', 'coc');
                        cy.getByData("modal--manual__close").should('not.have.value', '7507');
                        cy.screenshot('Input vacío en modal manual tras filtrar-cerrar modal manual fuera', {
                            capture: 'viewport',            // Define qué parte capturar
                            disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                            scale: true,                     // Escala la imagen en pantallas con alta resolución
                            timout: 1000,                     // Espera hasta 5 segundos antes de 
                            overwrite: true
                            // capturar
                        })

                    })

                })

                describe("Si se selecciona un producto por pieza", () => {
                    beforeEach(() => {
                        // Abrir ventana modal buscar por codigo de barras y escribir en ella
                        cy.getByData("modal--manual__close").should('be.visible')
                        cy.getByData("modal--manual__close").type("7507")
                        cy.getByData("descripcionProductoTbodyModalManual").should('be.visible')
                        cy.getByData("descripcionProductoTbodyModalManual").contains('25').click()
                    })
                    it("Se debe mostrar en el carrito", () => {
                        cy.getByData("idCarrito").should('exist')
                        cy.getByData("cantidadCarrito").should('exist')
                        cy.getByData("nombreCarrito").should('exist')
                        cy.getByData("descripcionCarrito").should('exist')
                        cy.getByData("codigoBarrasCarrito").should('exist')
                        cy.getByData("imgCarrito").should('exist')
                        cy.screenshot('Mostrar en el carrito con modal manual', {
                            capture: 'viewport',            // Define qué parte capturar
                            disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                            scale: true,                     // Escala la imagen en pantallas con alta resolución
                            timeout: 5000,                     // Espera hasta 5 segundos antes de capturar
                            overwrite: true
                        })
                    })

                    it("Debe tener los valores correctos en el carrito", () => {
                        // cy.getByData("idCarrito").contains('39')
                        cy.getByData("cantidadCarrito").contains('1')
                        cy.getByData("nombreCarrito").contains('Cigarros Shots Classics')
                        cy.getByData("descripcionCarrito").contains('25')
                        cy.getByData("codigoBarrasCarrito").contains('75078843')
                        cy.getByData("imgCarrito").should('exist')

                        cy.screenshot('Debe tener los valores correctos con modal manual', {
                            capture: 'runner',            // Define qué parte capturar
                            disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                            scale: true,                     // Escala la imagen en pantallas con alta resolución
                            timeout: 5000,                     // Espera hasta 5 segundos antes de capturar
                            overwrite: true
                        })

                        const precio = 79;
                        const cantidad = 1;
                        const nombre = 'Cigarros Shots Classics';
                        const descripcion = '25'
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

                    describe("Si se selecciona de nuevo el mismo producto", () => {

                        beforeEach(() => {
                            cy.getByData("botonBusquedaManual").click()
                            cy.getByData("modal--manual__close").should('be.visible')
                        })

                        it("Debe incrementar la cantidad", () => {
                            cy.getByData("modal--manual__close").type("7507")
                            cy.getByData("descripcionProductoTbodyModalManual").should('be.visible')
                            cy.getByData("descripcionProductoTbodyModalManual").contains('25').click()

                            cy.getByData("Cantidadtotal").contains('158')
                            cy.getByData("numeroArticulos").contains('2')

                            cy.getByData("nombreDetallesProducto").contains('Cigarros Shots Classics')
                            cy.getByData("descripcionDetallesProducto").contains('25')
                            cy.getByData("cantidadDetallesProducto").contains('Cantidad: 2')
                            cy.getByData("precioVentaDetallesProducto").contains('79')
                            cy.getByData("totalDetallesProducto").contains('158')

                        })

                        describe("Si se selecciona otro producto por pieza", () => {
                            beforeEach(() => {
                                cy.getByData("modal--manual__close").type("7501055313532")
                                cy.getByData("descripcionProductoTbodyModalManual").should('be.visible')
                                cy.getByData("descripcionProductoTbodyModalManual").contains('1.75 L').click()
                            })

                            it("Debe añadir ese producto al carrito", () => {
                                const precio = 37.50;
                                const cantidad = 1;
                                const nombre = 'Coca-Cola';
                                const descripcion = '1.75 L'
                                const total = (precio * cantidad + 79).toFixed(2);
                                cy.getByData("Cantidadtotal").contains(`${total}`)
                                cy.getByData("numeroArticulos").contains('2')
                                cy.getByData("nombreDetallesProducto").contains(`${nombre}`)
                                cy.getByData("descripcionDetallesProducto").contains(`${descripcion}`)
                                cy.getByData("cantidadDetallesProducto").contains(`Cantidad: ${cantidad}`)
                                cy.getByData("precioVentaDetallesProducto").contains('37.50')
                                cy.getByData("totalDetallesProducto").contains(`${precio}`)
                            })

                            it("Debe poder editar la cantidad y actualizar la tabla", () => {
                                const precio = 79;
                                const cantidad = 3;
                                const nombre = 'Cigarros Shots Classics';
                                const descripcion = '25 Rojos'
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

                                // cy.getByData("idCarrito").contains('1')
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

                                const totalCarrito = total + 37.5;
                                cy.getByData("Cantidadtotal").contains(`$${totalCarrito}`)
                                cy.getByData("numeroArticulos").contains('4')
                            })
                        })

                        describe("Si se selecciona un producto a granel", () => {
                            beforeEach(() => {
                                cy.getByData("modal--manual__close").type("7501526")
                                cy.getByData("descripcionProductoTbodyModalManual").should('be.visible')
                                cy.getByData("descripcionProductoTbodyModalManual").contains('Fud').click()
                            })

                            it("Debe abrir la modal de granel y tener los valores correctos", () => {
                                const precio = 20;
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
                                    const precio = 20;
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
                                    const precio = 20;
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

                                    // const totalCarrito = total + 79;
                                    // cy.getByData("Cantidadtotal").contains(`$${totalCarrito}`)
                                    // cy.getByData("numeroArticulos").contains('4')
                                })

                                describe("Si se da click en confirmar", () => {
                                    beforeEach(() => {
                                        cy.getByData("botonConfirmarCantidadModalGranel").click()

                                    })

                                    it("Debe actualizarse el carrito", () => {

                                        const precio = 20;
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
                                        const precio = 20;
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
        })
    })

    context('Pruebas de funcionalidad modal nombre', () => {
        beforeEach(() => {
            // preparar el entorno para añadir productos

            cy.getByData("botonBusquedaNombre").click()
            cy.getByData("modal--nombre__close").should('be.visible')
            cy.screenshot('Abrir modal nombre', {
                capture: 'viewport',            // Define qué parte capturar
                disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                scale: true,                     // Escala la imagen en pantallas con alta resolución
                timout: 1000,                     // Espera hasta 5 segundos antes de 
                overwrite: true
                // capturar
            })
        })

        describe('Pruebas a modal', () => {


            describe("Debería poder Cerrar la ventana modal nombre sin haber escrito en ella", () => {
                it("Debería poder Cerrar la ventana modal nombre con el botón", () => {
                    // Cerrar ventana modal busqueda por codigo de barras
                    cy.getByData("botonCerrarModalNombre").should('be.visible')
                    cy.getByData("botonCerrarModalNombre").click()

                })

                it("Debería poder Cerrar la ventana modal nombre al dar click fuera de la modal", () => {
                    // Cerrar ventana modal busqueda por codigo de barras
                    cy.getByData("modal--nombre").click(50, 30).should('not.be.visible')
                })

            })

            describe("Si se hace una búsqueda por codigo de barras en nombre", () => {
                it("No debe arrojar resultados", () => {
                    cy.getByData("modal--nombre__close").should('be.visible')
                    cy.getByData("modal--nombre__close").type("7507")
                    cy.screenshot('No resultados modal nombre', {
                        capture: 'viewport',            // Define qué parte capturar
                        disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                        scale: true,                     // Escala la imagen en pantallas con alta resolución
                        timout: 1000,                     // Espera hasta 5 segundos antes de 
                        overwrite: true
                        // capturar
                    })
                })

            })

            describe('Si se busca un producto existente', () => {
                it("Debe mostrar el producto", () => {

                    cy.getByData("modal--nombre__close").should('be.visible')
                    cy.getByData("modal--nombre__close").type("cig")

                    cy.getByData("descripcionProductoTbodyModalNombre").contains('25')

                    cy.getByData("modal--nombre__close").should('not.have.value', '75078843')
                    cy.getByData("modal--nombre__close").should('have.value', 'cig')


                    cy.getByData("nombreProductoTbodyModalManual").contains('Cigarros Shots Classics')
                    cy.getByData("descripcionProductoTbodyModalManual").contains('25')
                    cy.getByData("precioUnitarioVentaProductoTbodyModalManual").contains('$79')
                    cy.getByData("imagenProductoTbodyModalManual").should('not.have.text', '4')
                    cy.screenshot('Cigarros busqueda nombre', {
                        capture: 'viewport',            // Define qué parte capturar
                        disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                        scale: true,                     // Escala la imagen en pantallas con alta resolución
                        timout: 1000,                     // Espera hasta 5 segundos antes de 
                        overwrite: true
                        // capturar
                    })
                })

                describe("Debería poder escribir en el input y cerrar la modal", () => {
                    it("Debería poder Cerrar la ventana modal nombre con el botón", () => {
                        cy.getByData("modal--nombre__close").should('be.visible')
                        cy.getByData("modal--nombre__close").type("cig")
                        // Cerrar ventana modal busqueda por nombre
                        cy.getByData("botonCerrarModalNombre").should('be.visible')
                        cy.getByData("botonCerrarModalNombre").click()
                    })

                    it("Debería poder Cerrar la ventana modal nombre al dar click fuera de la modal", () => {
                        cy.getByData("modal--nombre__close").type("cig")
                        // Cerrar ventana modal busqueda por nombre
                        cy.getByData("modal--nombre").click(50, 30).should('not.be.visible')
                    })
                })



                describe("Debe estar vacío el input de la otra modal al cerrar modalManual sin dar click en un producto", () => {
                    it("Debería poder Cerrar la ventana modal nombre con el botón", () => {
                        // Cerrar ventana modal busqueda por código de barras
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
                        cy.screenshot('Input Reiniciado tras cerrar modal nombre boton', {
                            capture: 'viewport',            // Define qué parte capturar
                            disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                            scale: true,                     // Escala la imagen en pantallas con alta resolución
                            timout: 1000,                     // Espera hasta 5 segundos antes de 
                            overwrite: true
                            // capturar
                        })
                    })

                    it("Debería poder Cerrar la ventana modal nombre al dar click fuera de la modal", () => {
                        // Cerrar ventana modal busqueda por codigo de barras
                        cy.getByData("modal--nombre__close").should('be.visible')
                        cy.getByData("modal--nombre__close").type("cig")
                        // Cerrar ventana modal busqueda por código de barras

                        cy.getByData("modal--nombre").click(50, 30).should('not.be.visible')


                        cy.getByData("botonBusquedaNombre").should('be.visible')
                        cy.getByData("botonBusquedaNombre").click()
                        cy.getByData("modal--nombre__close").should("be.visible")
                        // Valores a revisar
                        cy.getByData("modal--nombre__close").should('not.have.value', 'coc');
                        cy.getByData("modal--nombre__close").should('not.have.value', '7507');
                        cy.screenshot('Input Reiniciado tras cerrar modal nombre fuera', {
                            capture: 'viewport',            // Define qué parte capturar
                            disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                            scale: true,                     // Escala la imagen en pantallas con alta resolución
                            timout: 1000,                     // Espera hasta 5 segundos antes de 
                            overwrite: true
                            // capturar
                        })



                    })

                })

                describe("También el input de esta modal debe  estar vacío  si se cierra la modal sin dar click en un producto", () => {
                    it("Debería poder Cerrar la ventana modal manual con el botón", () => {
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
                        cy.screenshot('Input vacío en modal nombre tras cerrar modal nombre', {
                            capture: 'viewport',            // Define qué parte capturar
                            disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                            scale: true,                     // Escala la imagen en pantallas con alta resolución
                            timout: 1000,                     // Espera hasta 5 segundos antes de 
                            overwrite: true
                            // capturar
                        })
                    })


                    it("Debería poder Cerrar la ventana modal manual al dar click fuera de la modal", () => {
                        // Cerrar ventana modal busqueda por codigo de barras
                        cy.getByData("modal--nombre__close").should('be.visible')
                        cy.getByData("modal--nombre__close").type("cig")
                        // Cerrar ventana modal busqueda por código de barras
                        cy.getByData("modal--nombre").click(50, 30).should('not.be.visible')

                        // Abrir de nuevo la ventana modal, 
                        cy.getByData("botonBusquedaManual").should('be.visible')
                        cy.getByData("botonBusquedaManual").click()
                        cy.getByData("modal--manual__close").should("exist")
                        // Valores a revisar
                        cy.getByData("modal--manual__close").should('not.have.value', 'coc');
                        cy.getByData("modal--manual__close").should('not.have.value', '7507');
                        cy.screenshot('Input vacío en modal manual tras filtrar-cerrar modal manual fuera', {
                            capture: 'viewport',            // Define qué parte capturar
                            disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                            scale: true,                     // Escala la imagen en pantallas con alta resolución
                            timout: 1000,                     // Espera hasta 5 segundos antes de 
                            overwrite: true
                            // capturar
                        })

                    })

                })

                describe("Si se selecciona un producto por pieza", () => {
                    beforeEach(() => {
                        // Abrir ventana modal buscar por codigo de barras y escribir en ella
                        cy.getByData("modal--nombre__close").should('be.visible')
                        cy.getByData("modal--nombre__close").type("cig")
                        cy.getByData("descripcionProductoTbodyModalNombre").should('be.visible')
                        cy.getByData("descripcionProductoTbodyModalNombre").contains('25').click()
                    })

                    it("Se debe mostrar en el carrito", () => {
                        cy.getByData("idCarrito").should('exist')
                        cy.getByData("cantidadCarrito").should('be.visible')
                        cy.getByData("nombreCarrito").should('be.visible')
                        cy.getByData("descripcionCarrito").should('be.visible')
                        cy.getByData("codigoBarrasCarrito").should('be.visible')
                        cy.getByData("imgCarrito").should('be.visible')
                        cy.screenshot('Mostrar en el carrito con modal nombre', {
                            capture: 'viewport',            // Define qué parte capturar
                            disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                            scale: true,                     // Escala la imagen en pantallas con alta resolución
                            timeout: 5000,                     // Espera hasta 5 segundos antes de capturar
                            overwrite: true
                        })
                    })

                    it("Debe tener los valores correcto en el carrito", () => {
                        // cy.getByData("idCarrito").contains('39')
                        cy.getByData("cantidadCarrito").contains('1')
                        cy.getByData("nombreCarrito").contains('Cigarros Shots Classics')
                        cy.getByData("descripcionCarrito").contains('25')
                        cy.getByData("codigoBarrasCarrito").contains('75078843')
                        cy.getByData("imgCarrito").should('be.visible')
                        cy.screenshot('Debe tener los valores correctos con modal nombre', {
                            capture: 'runner',            // Define qué parte capturar
                            disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                            scale: true,                     // Escala la imagen en pantallas con alta resolución
                            timeout: 5000,                     // Espera hasta 5 segundos antes de capturar
                            overwrite: true
                        })


                        const precio = 79;
                        const cantidad = 1;
                        const nombre = 'Cigarros Shots Classics';
                        const descripcion = '25'
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

                    describe("Si se selecciona de nuevo el mismo producto", () => {
                        beforeEach(() => {
                            cy.getByData("botonBusquedaNombre").click()
                            cy.getByData("modal--nombre__close").should('be.visible')
                        })

                        it("Debe incrementar la cantidad", () => {
                            cy.getByData("modal--nombre__close").type("cig")
                            cy.getByData("descripcionProductoTbodyModalNombre").should('be.visible')
                            cy.getByData("descripcionProductoTbodyModalNombre").contains('25').click()

                            cy.getByData("Cantidadtotal").contains('158')
                            cy.getByData("numeroArticulos").contains('2')

                            cy.getByData("nombreDetallesProducto").contains('Cigarros Shots Classics')
                            cy.getByData("descripcionDetallesProducto").contains('25')
                            cy.getByData("cantidadDetallesProducto").contains('Cantidad: 2')
                            cy.getByData("precioVentaDetallesProducto").contains('79')
                            cy.getByData("totalDetallesProducto").contains('158')

                        })

                        describe("Si se selecciona otro producto por pieza", () => {
                            beforeEach(() => {
                                cy.getByData("modal--nombre__close").type("coc")
                                cy.getByData("descripcionProductoTbodyModalNombre").should('be.visible')
                                cy.getByData("descripcionProductoTbodyModalNombre").contains('1.75 L').click()
                            })

                            it("Debe añadir ese producto al carrito", () => {
                                const precio = 37.50;
                                const cantidad = 1;
                                const nombre = 'Coca-Cola';
                                const descripcion = '1.75 L'
                                const total = (precio * cantidad + 79).toFixed(2);
                                cy.getByData("Cantidadtotal").contains(`${total}`)
                                cy.getByData("numeroArticulos").contains('2')
                                cy.getByData("nombreDetallesProducto").contains(`${nombre}`)
                                cy.getByData("descripcionDetallesProducto").contains(`${descripcion}`)
                                cy.getByData("cantidadDetallesProducto").contains(`Cantidad: ${cantidad}`)
                                cy.getByData("precioVentaDetallesProducto").contains('37.50')
                                cy.getByData("totalDetallesProducto").contains(`${precio}`)
                            })

                            it("Debe poder editar la cantidad y actualizar la tabla", () => {
                                const precio = 79;
                                const cantidad = 3;
                                const nombre = 'Cigarros Shots Classics';
                                const descripcion = '25 Rojos'
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

                                // cy.getByData("idCarrito").contains('1')
                                cy.getByData("cantidadCarrito").contains('3')
                                cy.getByData("nombreCarrito").contains('Cigarros Shots Classics')
                                cy.getByData("descripcionCarrito").contains('25 Rojos')
                                cy.getByData("codigoBarrasCarrito").contains('75078843')
                                cy.getByData("imgCarrito").should('exist')

                                cy.getByData("nombreDetallesProducto").contains(`${nombre}`)
                                cy.getByData("descripcionDetallesProducto").contains(`${descripcion}`)
                                cy.getByData("cantidadDetallesProducto").contains(`Cantidad: ${cantidad}`)
                                cy.getByData("precioVentaDetallesProducto").contains(`${precio}`)
                                cy.getByData("totalDetallesProducto").contains(`${total}`)

                                const totalCarrito = total + 37.5;
                                cy.getByData("Cantidadtotal").contains(`$${totalCarrito}`)
                                cy.getByData("numeroArticulos").contains('4')
                            })
                        })

                        describe("Si se selecciona un producto a granel", () => {
                            beforeEach(() => {
                                cy.getByData("modal--nombre__close").type("jam")
                                cy.getByData("descripcionProductoTbodyModalNombre").should('be.visible')
                                cy.getByData("descripcionProductoTbodyModalNombre").contains('Fud').click()
                            })

                            it("Debe abrir la modal de granel y tener los valores correctos", () => {
                                const precio = 200;
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
                                    const precio = 200;
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
                                    const precio = 200;
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

                                    // const totalCarrito = total + 79;
                                    // cy.getByData("Cantidadtotal").contains(`$${totalCarrito}`)
                                    // cy.getByData("numeroArticulos").contains('4')
                                })

                                describe("Si se da click en confirmar", () => {
                                    beforeEach(() => {
                                        cy.getByData("botonConfirmarCantidadModalGranel").click()

                                    })

                                    it("Debe actualizarse el carrito", () => {

                                        const precio = 200;
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
                                        const precio = 200;
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
        })


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
            cy.getByData("descripcionDetallesProducto").contains('25')
            cy.getByData("cantidadDetallesProducto").contains('Cantidad: 1')
            cy.getByData("precioVentaDetallesProducto").contains('79')
            cy.getByData("totalDetallesProducto").contains('79')

        })
        describe("Pruebas al lector de código de barras", () => {


            describe("Si se escanea un producto que no está registrado", () => {
                it("No debe arrojar resultados", () => {
                    cy.getByData("documento").type('549878255')
                    cy.document().trigger("keydown", { key: "Enter", keyCode: 13, which: 13 })
                    cy.screenshot('No resultados lector código', {
                        capture: 'viewport',            // Define qué parte capturar
                        disableTimersAndAnimations: true, // Desactiva animaciones y temporizadores
                        scale: true,                     // Escala la imagen en pantallas con alta resolución
                        timout: 5000,                     // Espera hasta 5 segundos antes de 
                        overwrite: true
                        // capturar
                    })
                })
            })

            describe("Si se escanea de nuevo el mismo producto", () => {
                it("Debe incrementar la cantidad", () => {
                    cy.getByData("documento").type('75078843')
                    cy.document().trigger("keydown", { key: "Enter", keyCode: 13, which: 13 })
                    // cy.getByData("idCarrito").contains('39')
                    cy.getByData("cantidadCarrito").contains('2')
                    cy.getByData("nombreCarrito").contains('Cigarros Shots Classics')
                    cy.getByData("descripcionCarrito").contains('25')
                    cy.getByData("codigoBarrasCarrito").contains('75078843')
                    cy.getByData("imgCarrito").should('exist')


                    cy.getByData("Cantidadtotal").contains('158')
                    cy.getByData("numeroArticulos").contains('2')

                    cy.getByData("nombreDetallesProducto").contains('Cigarros Shots Classics')
                    cy.getByData("descripcionDetallesProducto").contains('25')
                    cy.getByData("cantidadDetallesProducto").contains('Cantidad: 2')
                    cy.getByData("precioVentaDetallesProducto").contains('79')
                    cy.getByData("totalDetallesProducto").contains('158')

                })

            })


            describe("Si se escanea otro producto por pieza", () => {
                beforeEach(() => {
                    cy.getByData("documento").type('7501055313532')
                    cy.document().trigger("keydown", { key: "Enter", keyCode: 13, which: 13 })
                })
                it("Debe añadir ese producto al carrito", () => {

                    // cy.getByData("idCarrito").contains('1')
                    cy.getByData("cantidadCarrito").contains('1')
                    cy.getByData("nombreCarrito").contains('Coca-Cola')
                    cy.getByData("descripcionCarrito").contains('1.75 L')
                    cy.getByData("codigoBarrasCarrito").contains('7501055313532')
                    cy.getByData("imgCarrito").should('exist')
                })

                it("Debe poder editar cantidad y actualizar la tabla", () => {

                    const precio = 79;
                    const cantidad = 3;
                    const nombre = 'Cigarros Shots Classics';
                    const descripcion = '25 Rojos'
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

                    // cy.getByData("idCarrito").contains('1')
                    cy.getByData("cantidadCarrito").contains('3')
                    cy.getByData("nombreCarrito").contains('Cigarros Shots Classics')
                    cy.getByData("descripcionCarrito").contains('25 Rojos')
                    cy.getByData("codigoBarrasCarrito").contains('75078843')
                    cy.getByData("imgCarrito").should('exist')

                    cy.getByData("nombreDetallesProducto").contains(`${nombre}`)
                    cy.getByData("descripcionDetallesProducto").contains(`${descripcion}`)
                    cy.getByData("cantidadDetallesProducto").contains(`Cantidad: ${cantidad}`)
                    cy.getByData("precioVentaDetallesProducto").contains(`${precio}`)
                    cy.getByData("totalDetallesProducto").contains(`${total}`)

                    const totalCarrito = total + 37.5;
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
                    const precio = 200;
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
                        const precio = 200;
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
                        const precio = 200;
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

                        // const totalCarrito = total + 79;
                        // cy.getByData("Cantidadtotal").contains(`$${totalCarrito}`)
                        // cy.getByData("numeroArticulos").contains('4')
                    })

                    describe("Si se da click en confirmar", () => {
                        beforeEach(() => {
                            cy.getByData("botonConfirmarCantidadModalGranel").click()

                        })

                        it("Debe actualizarse el carrito", () => {

                            const precio = 200;
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

                            const precio = 200;
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
        cy.getByData("descripcionProductoTbodyModalManual").contains('25').click()
        // Abrir ventana modal buscar por nombre y escribir en ella
        cy.getByData("botonBusquedaNombre").click()
        cy.getByData("modal--nombre__close").should('exist')
        cy.getByData("modal--nombre__close").type("cig")
        cy.getByData('descripcionProductoTbodyModalNombre')
        cy.getByData("descripcionProductoTbodyModalNombre").contains('25').click()
    })

})