import { test as baseTest, request } from '@playwright/test';
import { APIService } from './services.js';

export const test = baseTest.extend({
    apiService: async ({ playwright }, use) => {
        // Create a new request context (global)
        const apiRequestContext = await playwright.request.newContext();
        
        // Initialize APIService with the request context
        const apiService = new APIService(apiRequestContext);

        // Provide apiService to tests
        await use(apiService);

        // Dispose of request context after tests
        await apiRequestContext.dispose();
    },
});


