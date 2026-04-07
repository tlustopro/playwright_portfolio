import { test as base, expect } from '@playwright/test';
import { AuthClient } from '../api/authClient';
import { ProductsClient } from '../api/productsClient';
import { CartsClient } from '../api/cartsClient';
import { AuthSuccessResponse } from '../types/api.types';

type ApiCredentials = {
  username: string;
  password: string;
};

type ApiUsers = {
  VALID: ApiCredentials;
  INVALID: ApiCredentials;
};

type ApiFixtures = {
  authClient: AuthClient;
  productsClient: ProductsClient;
  cartsClient: CartsClient;
  apiUsers: ApiUsers;
  authenticatedRequest: { token: string };
};

export const API_USERS: ApiUsers = {
  VALID: { username: 'emilys', password: 'emilyspass' },
  INVALID: { username: 'wronguser', password: 'wrongpass' },
};

export const test = base.extend<ApiFixtures>({
  authClient: async ({ request }, use) => {
    await use(new AuthClient(request));
  },
  productsClient: async ({ request }, use) => {
    await use(new ProductsClient(request));
  },
  cartsClient: async ({ request }, use) => {
    await use(new CartsClient(request));
  },
  apiUsers: async ({}, use) => {
    await use(API_USERS);
  },
  authenticatedRequest: async ({ authClient }, use) => {
    const response = await authClient.login(API_USERS.VALID.username, API_USERS.VALID.password);
    const body: AuthSuccessResponse = await response.json();
    await use({ token: body.accessToken });
  },
});

export { expect };
