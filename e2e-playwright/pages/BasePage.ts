import { Page, Locator, expect } from '@playwright/test';

/**
 * Comportamento comum a todas as paginas.
 * Centraliza navegacao e o menu lateral, presente em toda a aplicacao logada.
 */
export abstract class BasePage {
  readonly page: Page;
  readonly burgerMenuButton: Locator;
  readonly logoutLink: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  /** Quantidade de itens no carrinho. Zero quando o badge nao esta visivel. */
  async getCartCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      return Number(await this.cartBadge.innerText());
    }
    return 0;
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.burgerMenuButton.click();
    await expect(this.logoutLink).toBeVisible();
    await this.logoutLink.click();
  }
}
