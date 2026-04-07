import { test, expect, API_USERS } from '../../fixtures/api-fixtures';
import { AuthSuccessResponse, AuthErrorResponse, UserProfile } from '../../types/api.types';

test.describe('DummyJSON Auth API', () => {
  test('POST /auth/login — valid credentials returns 200 with tokens and user profile', async ({
    authClient,
    apiUsers,
  }) => {
    const response = await authClient.login(apiUsers.VALID.username, apiUsers.VALID.password);
    const body: AuthSuccessResponse = await response.json();

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('accessToken');
    expect(body).toHaveProperty('refreshToken');
    expect(typeof body.accessToken).toBe('string');
    expect(body.accessToken.length).toBeGreaterThan(0);
    expect(body.username).toBe(apiUsers.VALID.username);
    expect(typeof body.id).toBe('number');
    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('firstName');
    expect(body).toHaveProperty('lastName');
  });

  test('POST /auth/login — invalid credentials returns 400 with error message', async ({
    authClient,
    apiUsers,
  }) => {
    const response = await authClient.login(apiUsers.INVALID.username, apiUsers.INVALID.password);
    const body: AuthErrorResponse = await response.json();

    expect(response.status()).toBe(400);
    expect(body).toHaveProperty('message');
    expect(typeof body.message).toBe('string');
    expect(body.message.toLowerCase()).toContain('invalid');
  });

  test('GET /auth/me — valid token returns current user profile', async ({
    authClient,
    authenticatedRequest,
  }) => {
    const response = await authClient.getProfile(authenticatedRequest.token);
    const body: UserProfile = await response.json();

    expect(response.status()).toBe(200);
    expect(typeof body.id).toBe('number');
    expect(body.username).toBe(API_USERS.VALID.username);
    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('firstName');
    expect(body).toHaveProperty('lastName');
  });
});
