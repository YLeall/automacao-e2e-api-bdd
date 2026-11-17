declare global {
  namespace Cypress {
    interface Chainable {
      /** Autentica pela tela de login do Sauce Demo. */
      login(usuario: string, senha: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (usuario: string, senha: string) => {
  cy.visit('/');
  cy.get('[data-test="username"]').clear().type(usuario);
  cy.get('[data-test="password"]').clear().type(senha, { log: false });
  cy.get('[data-test="login-button"]').click();
});

export {};
