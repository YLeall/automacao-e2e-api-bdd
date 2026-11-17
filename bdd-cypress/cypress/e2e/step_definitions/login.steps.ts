import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

/**
 * Os arquivos .feature estao em portugues (# language: pt).
 * O preprocessor casa o passo pelo TEXTO, nao pela palavra-chave, entao
 * Dado/Quando/Entao/E do Gherkin sao atendidos por Given/When/Then aqui.
 */

Given('que estou na tela de login', () => {
  cy.visit('/');
  cy.get('[data-test="login-button"]').should('be.visible');
});

When('informo o usuário {string} e a senha {string}', (usuario: string, senha: string) => {
  cy.get('[data-test="username"]').clear().type(usuario);
  cy.get('[data-test="password"]').clear().type(senha, { log: false });
});

When('informo apenas o usuário {string}', (usuario: string) => {
  cy.get('[data-test="username"]').clear().type(usuario);
  cy.get('[data-test="password"]').clear();
});

When('confirmo o acesso', () => {
  cy.get('[data-test="login-button"]').click();
});

Then('sou direcionado para a listagem de produtos', () => {
  cy.url().should('include', '/inventory.html');
  cy.get('[data-test="title"]').should('have.text', 'Products');
});

Then('vejo a mensagem de erro {string}', (mensagem: string) => {
  cy.get('[data-test="error"]').should('be.visible').and('contain.text', mensagem);
});
