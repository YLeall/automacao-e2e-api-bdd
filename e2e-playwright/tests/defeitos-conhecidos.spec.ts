import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users, products } from '../fixtures/users';

/**
 * Suite dedicada a deteccao de defeito.
 * Cada teste aqui cobre uma falha real do sistema sob teste, descrita
 * em docs/bug-reports.md. Os testes afirmam o comportamento CORRETO,
 * entao falham de proposito enquanto o defeito existir.
 */
test.describe('CT-BUG - Defeitos reproduzidos', () => {
  test('CT-BUG-01 - imagens dos produtos devem ser distintas entre si (BUG-001)', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(users.problem.username, users.problem.password);

    const inventory = new InventoryPage(page);
    await inventory.expectLoaded();

    const sources = await inventory.getImageSources();
    const unique = new Set(sources);

    // Com problem_user todos os produtos carregam a mesma imagem.
    test.fail(true, 'BUG-001: todos os produtos exibem a mesma imagem');
    expect(unique.size).toBe(sources.length);
  });

  test('CT-BUG-02 - remover produto deve funcionar para qualquer item (BUG-002)', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(users.problem.username, users.problem.password);

    const inventory = new InventoryPage(page);
    await inventory.expectLoaded();
    await inventory.addToCart(products.backpack);
    expect(await inventory.getCartCount()).toBe(1);

    test.fail(true, 'BUG-002: botao de remover nao responde para parte dos produtos');
    await inventory.removeFromCart(products.backpack);
    expect(await inventory.getCartCount()).toBe(0);
  });

  test('CT-BUG-03 - login nao deve ultrapassar 5 segundos (BUG-004)', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();

    const start = Date.now();
    await login.login(users.performanceGlitch.username, users.performanceGlitch.password);
    await new InventoryPage(page).expectLoaded();
    const elapsed = Date.now() - start;

    expect(elapsed, `Login levou ${elapsed}ms`).toBeLessThan(5000);
  });
});
