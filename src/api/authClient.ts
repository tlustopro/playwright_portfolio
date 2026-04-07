import { APIRequestContext, APIResponse } from '@playwright/test';

export class AuthClient {
  constructor(private request: APIRequestContext) {}

  async login(username: string, password: string): Promise<APIResponse> {
    return this.request.post('/auth/login', {
      data: { username, password },
    });
  }

  async getProfile(token: string): Promise<APIResponse> {
    return this.request.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
