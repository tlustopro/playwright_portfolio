import { test, expect } from '../../fixtures/api-fixtures';
import { Cart } from '../../types/api.types';

test.describe('DummyJSON Carts API', () => {
  test('GET /carts/{id} — returns cart with correct shape', async ({ cartsClient }) => {
    const response = await cartsClient.getById(1);
    const body: Cart = await response.json();

    expect(response.status()).toBe(200);
    expect(body.id).toBe(1);
    expect(typeof body.total).toBe('number');
    expect(typeof body.discountedTotal).toBe('number');
    expect(typeof body.userId).toBe('number');
    expect(typeof body.totalProducts).toBe('number');
    expect(typeof body.totalQuantity).toBe('number');
    expect(Array.isArray(body.products)).toBe(true);

    for (const item of body.products) {
      expect(typeof item.id).toBe('number');
      expect(typeof item.title).toBe('string');
      expect(typeof item.price).toBe('number');
      expect(typeof item.quantity).toBe('number');
      expect(item.quantity).toBeGreaterThan(0);
    }
  });

  test('GET /carts/{id} — totals are arithmetically consistent', async ({ cartsClient }) => {
    const response = await cartsClient.getById(1);
    const body: Cart = await response.json();

    const summedQuantity = body.products.reduce((acc, p) => acc + p.quantity, 0);
    expect(body.totalQuantity).toBe(summedQuantity);
    expect(body.totalProducts).toBe(body.products.length);
    expect(body.discountedTotal).toBeLessThanOrEqual(body.total);
  });

  test('POST /carts/add — creates cart and returns correct structure', async ({ cartsClient }) => {
    const payload = {
      userId: 1,
      products: [
        { id: 1, quantity: 2 },
        { id: 50, quantity: 1 },
      ],
    };

    const response = await cartsClient.add(payload);
    const body: Cart = await response.json();

    // dummyjson returns 201 for POST /carts/add — asserting exact status validates correct API behavior
    expect(response.status()).toBe(201);
    expect(typeof body.id).toBe('number');
    expect(body.userId).toBe(payload.userId);
    expect(body.totalProducts).toBe(payload.products.length);

    const totalQty = payload.products.reduce((acc, p) => acc + p.quantity, 0);
    expect(body.totalQuantity).toBe(totalQty);

    expect(typeof body.total).toBe('number');
    expect(body.total).toBeGreaterThan(0);
    expect(body.discountedTotal).toBeLessThanOrEqual(body.total);
  });

  test('POST /carts/add — returned product fields match request', async ({ cartsClient }) => {
    const payload = {
      userId: 1,
      products: [{ id: 1, quantity: 3 }],
    };

    const response = await cartsClient.add(payload);
    const body: Cart = await response.json();
    const returnedProduct = body.products[0];

    expect(returnedProduct.id).toBe(1);
    expect(returnedProduct.quantity).toBe(3);
    expect(returnedProduct.total).toBeCloseTo(returnedProduct.price * 3, 2);
  });
});
