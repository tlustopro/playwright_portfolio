import { APIRequestContext, APIResponse } from '@playwright/test';
import { GetAllParams } from '../types/api.types';

export class ProductsClient {
  constructor(private request: APIRequestContext) {}

  async getAll(params?: GetAllParams): Promise<APIResponse> {
    return this.request.get('/products', { params });
  }

  async getById(id: number): Promise<APIResponse> {
    return this.request.get(`/products/${id}`);
  }

  async search(query: string): Promise<APIResponse> {
    return this.request.get('/products/search', { params: { q: query } });
  }
}
