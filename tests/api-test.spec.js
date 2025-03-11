
import { test } from '../utils/fixtures.js';

test('basic API test', async ({ apiService }) => {
  const response = await apiService.post('https://reqres.in/api/login',
    {
      "email": "peter@klaven"
    }
  );
  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json();
  expect(responseBody.data).toHaveProperty('id', 2);
});
