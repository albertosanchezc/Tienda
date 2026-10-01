/// <reference types="cypress" />
import catalogoProductos from '../fixtures/catalogoProductos';
Cypress.Commands.add("getByData", (selector) => {
    return cy.get(`[data-test="${selector}"]`)
});

Cypress.Commands.add('login', () => {
    cy.session('admin', () => {
        cy.visit('/login');

        cy.get('[name=email]').type('zamudiolopezkarina@gmail.com');
        cy.get('[name=password]').type('123456');

        cy.get('[type="submit"]').click();

        cy.getCookies().then((cookies) => {
            cy.log(JSON.stringify(cookies));
        });

    });
});


Cypress.Commands.add('crearProducto', (producto) => {

    // cy.get('.config-overlay').click();
    cy.get('.botonslider3').click();

    cy.get('input[name="inventarioCrear[nombre]"]')
        .type(producto.nombre);

    cy.get('input[name="inventarioCrear[descripcion]"]')
        .type(producto.descripcion);

    cy.get('input[name="inventarioCrear[codigo_barras]"]')
        .type(producto.codigo);

    cy.get('select[name="inventarioCrear[categoria_id]"]')
        .select(producto.categoria);

    cy.get('select[name="inventarioCrear[proveedor_id]"]')
        .select(producto.proveedor);

    cy.get('input[name="inventarioCrear[precio_compra]"]')
        .type(producto.compra);

    cy.get('input[name="inventarioCrear[precio_unitario_venta]"]')
        .type(producto.venta);

    cy.get('#imagen')
        .attachFile(producto.imagen);

    cy.intercept('POST', '**').as('guardarProducto');

    cy.get('#nuevoproducto').submit();

    cy.wait('@guardarProducto');
});


Cypress.Commands.add('crearCatalogoPruebas', () => {

    catalogoProductos.forEach(producto => {
        cy.crearProducto(producto);
    });

});