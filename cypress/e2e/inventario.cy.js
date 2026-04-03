/// <reference types="cypress" />
describe('Pruebas del Inventario sin POST', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3004/inventario')

    })

    context('Pruebas de Funcionalidad Modales Con Relacion Botones', () => {
        describe('Modal Crear Nuevo Producto', () => {
            it("Deberia poder abrir la modal", () => {
                cy.getByData("bntNuevoProducto").should('be.visible')

            })
        })
    })

})