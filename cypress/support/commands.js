/// <reference types="cypress" />

Cypress.Commands.add("getByData", (selector) => {
    return cy.get(`[data-test="${selector}"]`)
});

Cypress.Commands.add('login', () => {
    cy.session('admin', () => {
        cy.visit('/login');

        cy.get('[name=email]').type('albertosanchezc98@gmail.com');
        cy.get('[name=password]').type('2Wiremodem');

        cy.get('[type="submit"]').click();

        cy.getCookies().then((cookies) => {
            cy.log(JSON.stringify(cookies));
        });

    });
});