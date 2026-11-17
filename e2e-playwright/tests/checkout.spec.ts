import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users, products, checkoutData } from '../fixtures/users';

test.describe('CT-CHK - Carrinho e checkout', () => {
  let inventory: InventoryPage;
  let cart: CartPage;
  let checkout: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(users.standard.username, users.standard.password);

    inventory = new InventoryPage(page);
    cart = new CartPage(page);
    checkout = new CheckoutPage(page);
    await inventory.expectLoaded();
  });

  test('CT-CHK-01 - produtos adicionados aparecem no carrinho', async () => {
    await inventory.addToCart(products.backpack);
    await inventory.addToCart(products.tshirt);
    await inventory.openCart();
    await cart.expectLoaded();

    const names = await cart.getItemNames();
    expect(names).toHaveLength(2);
    expect(names).toContain(products.backpack);
    expect(names).toContain(products.tshirt);
  });

  test('CT-CHK-02 - compra completa de um produto chega a confirmacao', async () => {
    await inventory.addToCart(products.backpack);
    await inventory.openCart();
    await cart.checkout();

    const { firstName, lastName, postalCode } = checkoutData.valid;
    await checkout.fillInformation(firstName, lastName, postalCode);
    await checkout.continue();
    await checkout.finish();
    await checkout.expectOrderCompleted();
  });

  test('CT-CHK-03 - checkout sem nome exibe mensagem de campo obrigatorio', async () => {
    await inventory.addToCart(products.backpack);
    await inventory.openCart();
    await cart.checkout();

    await checkout.fillInformation('', 'Leal', '40000-000');
    await checkout.continue();
    await checkout.expectErrorContaining('First Name is required');
  });

  test('CT-CHK-04 - checkout sem CEP exibe mensagem de campo obrigatorio', async () => {
    await inventory.addToCart(products.backpack);
    await inventory.openCart();
    await cart.checkout();

    const { firstName, lastName, postalCode } = checkoutData.missingPostalCode;
    await checkout.fillInformation(firstName, lastName, postalCode);
    await checkout.continue();
    await checkout.expectErrorContaining('Postal Code is required');
  });

  test('CT-CHK-05 - total do pedido equivale a soma de subtotal e imposto', async () => {
    await inventory.addToCart(products.backpack);
    await inventory.addToCart(products.bikeLight);
    await inventory.openCart();
    await cart.checkout();

    const { firstName, lastName, postalCode } = checkoutData.valid;
    await checkout.fillInformation(firstName, lastName, postalCode);
    await checkout.continue();

    const subtotal = await checkout.getSubtotal();
    const tax = await checkout.getTax();
    const total = await checkout.getTotal();

    expect(total).toBeCloseTo(subtotal + tax, 2);
  });

  test('CT-CHK-06 - carrinho vazio permite avancar ao checkout (comportamento documentado em BUG-003)', async () => {
    await inventory.openCart();
    await cart.expectLoaded();
    expect(await cart.getItemNames()).toHaveLength(0);

    // O sistema sob teste permite prosseguir com carrinho vazio.
    // O teste registra o comportamento atual; o defeito esta em docs/bug-reports.md.
    await expect(cart.checkoutButton).toBeEnabled();
  });
});
