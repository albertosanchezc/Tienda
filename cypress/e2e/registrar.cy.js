describe('Registro de usuario', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/registrar');
    });

    it('Debe registrar una nueva cuenta correctamente', () => {

        const email = `cypress_${Date.now()}@test.com`;

        // Registro
        cy.get('input[name="usuario[email]"]')
            .type(email);

        cy.get('input[name="usuario[password]"]')
            .type('123456');

        cy.get('input[name="usuario[password2]"]')
            .type('123456');

        cy.get('input[name="usuario[nombre]"]')
            .type('Alberto');

        cy.get('input[name="usuario[apellido]"]')
            .type('Sánchez Camacho');

        cy.get('input[name="usuario[telefono]"]')
            .type('4641230877');

        cy.get('input[name="tienda[nombre]"]')
            .type('El Dante Enojón');

        cy.get('form').submit();

        // Verificar mensaje
        cy.url().should('include', '/mensaje');
        cy.contains('Cuenta Creada Exitosmente');
        cy.contains('Es necesario confirmar tu cuenta');

        // Obtener token de la BD
        cy.task(
            'queryDb',
            `SELECT token FROM usuarios WHERE email='${email}'`
        ).then((rows) => {

            const token = rows[0].token;

            // Confirmar cuenta
            cy.visit(`http://localhost:3000/confirmar-cuenta?token=${token}`);

            cy.contains('Cuenta Confirmada');

            // Ir al login
            cy.visit('http://localhost:3000/login');

            // Iniciar sesión
            cy.get('input[name="email"]')
                .type(email);

            cy.get('input[name="password"]')
                .type('123456');

            cy.get('form').submit();

            // Verificar que inició sesión
            cy.url().should('include', '/proveedores');

            // Cerrar Asistente
            cy.get('.config-overlay').click();
            // Abrir formulario de registro de proveedor
            cy.get('.p2boton1').click();
            // Probando la creación de un proveedor
            // Llenar el formulario
            cy.get('input[name="aniadirProveedor[nombre]"]')
                .type('Proveedor de Prueba');

            cy.get('input[name="aniadirProveedor[telefono]"]')
                .type('4641234567');

            cy.get('input[name="aniadirProveedor[email]"]')
                .type('proveedor@test.com');

            // Enviar el formulario
            cy.get('#aniadirProveedor').submit();

            cy.task(
                'queryDb',
                `SELECT id FROM proveedor WHERE email='proveedor@test.com'`
            )
                .then((rows) => {

                    // expect(rows).to.have.length(1);

                    const proveedorId = rows[0].id;

                    cy.log(`Proveedor creado con ID: ${proveedorId}`);
                    // Verificar que inició sesión
                    cy.url().should('include', '/inventario');
                    // Cerrar Asistente
                    cy.get('.config-overlay').click();
                    // Abrir formulario de registro de proveedor
                    cy.get('.botonslider3').click();

                    cy.get('input[name="inventarioCrear[nombre]"]')
                        .type('Coca-Cola');


                    cy.get('input[name="inventarioCrear[descripcion]"]')
                        .type('600 ml');


                    cy.get('input[name="inventarioCrear[codigo_barras]"]')
                        .type('7501055330116');



                    cy.get('select[name="inventarioCrear[categoria_id]"]')
                        .select('7');



                    cy.get('select[name="inventarioCrear[proveedor_id]"]')
                        .select(proveedorId);



                    // cy.get('#optionpieza')
                    //     .check();



                    cy.get('input[name="inventarioCrear[precio_compra]"]')
                        .type('12');



                    cy.get('input[name="inventarioCrear[precio_unitario_venta]"]')
                        .type('15');



                    // cargar imagen
                    cy.get('#imagen')
                        .attachFile('producto.jpeg');



                    cy.get('#nuevoproducto')
                        .submit();


                    // aquí continúa la creación del producto

                    /*
                    =========================
                    VALIDAR BD
                    =========================
                    */


                    cy.task(
                        'queryDb',
                        `SELECT * FROM productos WHERE codigo_barras='7501055330116'`
                    )
                        .then((rows) => {

                            expect(rows).to.have.length(1);

                            expect(rows[0].nombre.trim())
                                .to.equal('Coca Cola');

                        });

                });
        });

    });

});