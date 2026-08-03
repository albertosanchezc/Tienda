/// <reference types="cypress" />
describe('Inventario', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/inventario');
    });

    it('Debe crear los productos necesarios para las pruebas', () => {

        // cy.crearProducto({
        //     nombre: 'Cigarros Shots Classics',
        //     descripcion: '25 Rojos',
        //     codigo: '75078843',
        //     categoria: '21',
        //     proveedor: '1',
        //     compra: '50',
        //     venta: '79',
        //     imagen: 'producto_3.jpeg'
        // });

        // cy.crearProducto({
        //     nombre: 'Coca-Cola',
        //     descripcion: '1.75 L',
        //     codigo: '7501055313532',
        //     categoria: '7',
        //     proveedor: '1',
        //     compra: '20',
        //     venta: '37.50',
        //     imagen: 'producto_2.jpeg'
        // });
        cy.crearCatalogoPruebas();

    });

    it('Debe abrir la modal de nuevo producto', () => {

        cy.getByData("bntNuevoProducto").should('be.visible');

    });

});