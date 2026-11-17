import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly sortSelect: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.items = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.title).toHaveText('Products');
  }

  async countItems(): Promise<number> {
    return this.items.count();
  }

  /** Converte o nome do produto no id usado pelos data-test dos botoes. */
  private slug(productName: string): string {
    return productName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  async addToCart(productName: string): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${this.slug(productName)}"]`).click();
  }

  async removeFromCart(productName: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${this.slug(productName)}"]`).click();
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortSelect.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return (await this.itemNames.allInnerTexts()).map((t) => t.trim());
  }

  async getProductPrices(): Promise<number[]> {
    const raw = await this.itemPrices.allInnerTexts();
    return raw.map((t) => Number(t.replace('$', '').trim()));
  }

  async getImageSources(): Promise<string[]> {
    return this.page.locator('.inventory_item_img img').evaluateAll(
      (imgs) => imgs.map((i) => (i as HTMLImageElement).getAttribute('src') ?? ''),
    );
  }
}
