/// <reference types="cypress" />
describe('Inventario', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/inventario');
    });

    it('Debe crear los productos necesarios para las pruebas', () => {

        cy.crearCatalogoPruebas();

    });

    it('Debe abrir la modal de nuevo producto', () => {

        cy.getByData("bntNuevoProducto").should('not.be.visible');

    });

});