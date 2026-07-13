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
            cy.url().should('include', '/');
        });

    });

});