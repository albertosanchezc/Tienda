describe('Registro de usuario', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
    });

    it('Debe Iniciar Sesión', () => {

        cy.get('input[name="usuario[email]"]')
            .type('albertosanchezc98@gmail.com');

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

        // Verificar que redirigió
        cy.url().should('include', '/mensaje');

        // Verificar el contenido
        cy.contains('Cuenta Creada Exitosmente');
        cy.contains('Es necesario confirmar tu cuenta');
    });

});