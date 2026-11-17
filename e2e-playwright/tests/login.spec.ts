import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../fixtures/users';

test.describe('CT-LOGIN - Autenticacao', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('CT-LOGIN-01 - usuario valido acessa a listagem de produtos', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await new InventoryPage(page).expectLoaded();
  });

  test('CT-LOGIN-02 - senha incorreta bloqueia o acesso', async () => {
    await loginPage.login(users.standard.username, 'senha_errada');
    await loginPage.expectErrorContaining('Username and password do not match');
  });

  test('CT-LOGIN-03 - usuario inexistente bloqueia o acesso', async () => {
    await loginPage.login(users.invalid.username, users.invalid.password);
    await loginPage.expectErrorContaining('Username and password do not match');
  });

  test('CT-LOGIN-04 - usuario sem senha recebe mensagem de campo obrigatorio', async () => {
    await loginPage.login(users.standard.username, '');
    await loginPage.expectErrorContaining('Password is required');
  });

  test('CT-LOGIN-05 - campos vazios recebem mensagem de campo obrigatorio', async () => {
    await loginPage.login('', '');
    await loginPage.expectErrorContaining('Username is required');
  });

  test('CT-LOGIN-06 - usuario bloqueado recebe mensagem especifica', async () => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await loginPage.expectErrorContaining('Sorry, this user has been locked out');
  });

  test('CT-LOGIN-07 - area logada nao e acessivel por URL direta sem sessao', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(page).not.toHaveURL(/inventory\.html/);
    await loginPage.expectErrorContaining("You can only access '/inventory.html' when you are logged in");
  });

  test('CT-LOGIN-08 - logout encerra a sessao e retorna ao login', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    const inventory = new InventoryPage(page);
    await inventory.expectLoaded();
    await inventory.logout();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
