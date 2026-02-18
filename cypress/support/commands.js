Cypress.Commands.add("getByCy", (value) => cy.get(`[data-cy="${value}"]`));
