import { APIRequestContext, APIResponse } from '@playwright/test';

interface AddCartPayload {
  userId: number;
  products: Array<{ id: number; quantity: number }>;
}

export class CartsClient {
  constructor(private request: APIRequestContext) {}

  async getById(cartId: number): Promise<APIResponse> {
    return this.request.get(`/carts/${cartId}`);
  }

  async add(payload: AddCartPayload): Promise<APIResponse> {
    return this.request.post('/carts/add', { data: payload });
  }
}
