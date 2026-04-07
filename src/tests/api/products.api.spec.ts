import { test, expect } from '../../fixtures/api-fixtures';
import { ProductsListResponse, Product } from '../../types/api.types';

test.describe('DummyJSON Products API', () => {
  test('GET /products — returns paginated list with correct envelope shape', async ({
    productsClient,
  }) => {
    const response = await productsClient.getAll({ limit: 10, skip: 0 });
    const body: ProductsListResponse = await response.json();

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('products');
    expect(body).toHaveProperty('total');
    expect(body).toHaveProperty('skip');
    expect(body).toHaveProperty('limit');
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBe(10);
    expect(typeof body.total).toBe('number');
    expect(body.total).toBeGreaterThan(0);
  });

  test('GET /products — each product has required fields with correct types', async ({
    productsClient,
  }) => {
    const response = await productsClient.getAll({ limit: 5 });
    const body: ProductsListResponse = await response.json();

    for (const product of body.products) {
      expect(typeof product.id).toBe('number');
      expect(typeof product.title).toBe('string');
      expect(product.title.length).toBeGreaterThan(0);
      expect(typeof product.price).toBe('number');
      expect(product.price).toBeGreaterThan(0);
      expect(typeof product.category).toBe('string');
      expect(typeof product.rating).toBe('number');
      expect(product.rating).toBeGreaterThanOrEqual(0);
      expect(product.rating).toBeLessThanOrEqual(5);
    }
  });

  test('GET /products/{id} — returns correct single product', async ({ productsClient }) => {
    const PRODUCT_ID = 1;
    const response = await productsClient.getById(PRODUCT_ID);
    const body: Product = await response.json();

    expect(response.status()).toBe(200);
    expect(body.id).toBe(PRODUCT_ID);
    expect(typeof body.title).toBe('string');
    expect(typeof body.price).toBe('number');
    expect(typeof body.description).toBe('string');
    expect(body).toHaveProperty('thumbnail');
    expect(body).toHaveProperty('images');
    expect(Array.isArray(body.images)).toBe(true);
  });

  test('GET /products/{id} — non-existent ID returns 404', async ({ productsClient }) => {
    const response = await productsClient.getById(999999);
    const body = await response.json();

    expect(response.status()).toBe(404);
    expect(body).toHaveProperty('message');
  });

  test('GET /products/search?q= — returns matching products', async ({ productsClient }) => {
    const response = await productsClient.search('laptop');
    const body: ProductsListResponse = await response.json();

    expect(response.status()).toBe(200);
    expect(body.total).toBeGreaterThan(0);
    expect(Array.isArray(body.products)).toBe(true);
    for (const product of body.products) {
      const titleOrDesc = (product.title + product.description).toLowerCase();
      expect(titleOrDesc).toContain('laptop');
    }
  });

  test('GET /products — pagination skip is reflected in response and returns different items', async ({
    productsClient,
  }) => {
    const responseFirst = await productsClient.getAll({ limit: 5, skip: 0 });
    const responseSecond = await productsClient.getAll({ limit: 5, skip: 5 });

    const firstPage: ProductsListResponse = await responseFirst.json();
    const secondPage: ProductsListResponse = await responseSecond.json();

    const firstIds = firstPage.products.map((p) => p.id);
    const secondIds = secondPage.products.map((p) => p.id);

    expect(firstIds.some((id) => secondIds.includes(id))).toBe(false);
  });
});
