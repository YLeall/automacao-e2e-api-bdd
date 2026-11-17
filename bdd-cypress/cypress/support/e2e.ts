import './commands';

// Os usuarios defeituosos do Sauce Demo geram excecoes nao tratadas no front.
// A suite ignora essas excecoes para que a falha seja avaliada pela asercao do
// teste, e nao pelo colapso da execucao.
Cypress.on('uncaught:exception', () => false);
