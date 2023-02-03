it('webapp deve estar on', function () {
  cy.visit('/')

  cy.title().should('eq', 'Samurai Barbershop by QAninja')
})
