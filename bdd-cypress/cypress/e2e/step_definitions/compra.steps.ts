import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

/** Converte o nome do produto no sufixo usado nos atributos data-test. */
const slug = (nome: string) => nome.toLowerCase().replace(/[^a-z0-9]+/g, '-');

Given('que estou autenticado como {string}', (usuario: string) => {
  cy.login(usuario, 'secret_sauce');
  cy.url().should('include', '/inventory.html');
});

Given('que adicionei o produto {string} ao carrinho', (produto: string) => {
  cy.get(`[data-test="add-to-cart-${slug(produto)}"]`).click();
});

When('adiciono o produto {string} ao carrinho', (produto: string) => {
  cy.get(`[data-test="add-to-cart-${slug(produto)}"]`).click();
});

When('removo o produto {string} do carrinho', (produto: string) => {
  cy.get(`[data-test="remove-${slug(produto)}"]`).click();
});

When('abro o carrinho', () => {
  cy.get('[data-test="shopping-cart-link"]').click();
  cy.url().should('include', '/cart.html');
});

When('inicio o checkout', () => {
  cy.get('[data-test="checkout"]').click();
  cy.url().should('include', '/checkout-step-one.html');
});

When('preencho os dados {string}, {string} e {string}', (nome: string, sobrenome: string, cep: string) => {
  cy.get('[data-test="firstName"]').clear();
  if (nome) cy.get('[data-test="firstName"]').type(nome);

  cy.get('[data-test="lastName"]').clear();
  if (sobrenome) cy.get('[data-test="lastName"]').type(sobrenome);

  cy.get('[data-test="postalCode"]').clear();
  if (cep) cy.get('[data-test="postalCode"]').type(cep);

  cy.get('[data-test="continue"]').click();
});

When('concluo o pedido', () => {
  cy.url().should('include', '/checkout-step-two.html');
  cy.get('[data-test="finish"]').click();
});

Then('o contador do carrinho exibe {int} item', (quantidade: number) => {
  cy.get('[data-test="shopping-cart-badge"]').should('have.text', String(quantidade));
});

Then('o carrinho fica vazio', () => {
  cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
});

Then('vejo a confirmação {string}', (mensagem: string) => {
  cy.url().should('include', '/checkout-complete.html');
  cy.get('[data-test="complete-header"]').should('have.text', mensagem);
});
