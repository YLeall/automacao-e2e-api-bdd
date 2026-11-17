import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users, products } from '../fixtures/users';

test.describe('CT-INV - Listagem e ordenacao de produtos', () => {
  let inventory: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(users.standard.username, users.standard.password);
    inventory = new InventoryPage(page);
    await inventory.expectLoaded();
  });

  test('CT-INV-01 - catalogo apresenta os seis produtos esperados', async () => {
    expect(await inventory.countItems()).toBe(6);
  });

  test('CT-INV-02 - ordenacao de A a Z organiza os nomes em ordem crescente', async () => {
    await inventory.sortBy('az');
    const names = await inventory.getProductNames();
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  test('CT-INV-03 - ordenacao de Z a A organiza os nomes em ordem decrescente', async () => {
    await inventory.sortBy('za');
    const names = await inventory.getProductNames();
    expect(names).toEqual([...names].sort((a, b) => b.localeCompare(a)));
  });

  test('CT-INV-04 - ordenacao por menor preco organiza os valores em ordem crescente', async () => {
    await inventory.sortBy('lohi');
    const prices = await inventory.getProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('CT-INV-05 - ordenacao por maior preco organiza os valores em ordem decrescente', async () => {
    await inventory.sortBy('hilo');
    const prices = await inventory.getProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('CT-INV-06 - adicionar produto incrementa o contador do carrinho', async () => {
    expect(await inventory.getCartCount()).toBe(0);
    await inventory.addToCart(products.backpack);
    expect(await inventory.getCartCount()).toBe(1);
    await inventory.addToCart(products.bikeLight);
    expect(await inventory.getCartCount()).toBe(2);
  });

  test('CT-INV-07 - remover produto decrementa o contador do carrinho', async () => {
    await inventory.addToCart(products.backpack);
    await inventory.removeFromCart(products.backpack);
    expect(await inventory.getCartCount()).toBe(0);
  });

  test('CT-INV-08 - nenhum produto e exibido sem preco', async () => {
    const prices = await inventory.getProductPrices();
    expect(prices).toHaveLength(6);
    prices.forEach((price) => expect(price).toBeGreaterThan(0));
  });
});
