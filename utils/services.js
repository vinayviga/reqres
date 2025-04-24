import { curlExtractor } from './support.js';
import { test } from './fixtures.js';
let curl = '';
const success_statuses = [200, 201, 204, 304]; // Add any other success statuses you want to handle
export class APIService {
    
    constructor(request) {
        this.request = request;
    }
    
    async get(url, headers = {}) {
        console.log(`GET Request: ${url}`);
        const response = await this.request.get(url, { headers });
        if(!success_statuses.includes(response.status()) )
            {
                curl =curlExtractor(url, 'GET', headers, null);
            }
        return this.handleResponse(response, curl);
    }

    async post(url, headers = {}, body = {}) {
        console.log(`POST Request: ${url}`);

        const response = await this.request.post(url, {
            headers,
            data: body
        });
        if(!success_statuses.includes(response.status()))
        {
           curl = curlExtractor(url, 'POST', headers, body);
        }
        return this.handleResponse(response, curl);
    }

    async put(url, headers = {}, body = {}) {
        console.log(`PUT Request: ${url}`);

        const response = await this.request.put(url, {
            headers,
            data: body
        });
        if(!success_statuses.includes(response.status()))
            {
               curl = curlExtractor(url, 'PUT', headers, body);
            }
        return this.handleResponse(response, curl);
    }

    async delete(url, headers = {}) {
        console.log(`DELETE Request: ${url}`);

        const response = await this.request.delete(url, { headers });
        
        if(!success_statuses.includes(response.status()))
            {
               curl = curlExtractor(url, 'DELETE', headers, null);
            }
        return this.handleResponse(response, curl);
    }

    async handleResponse(response, curl) {
        console.log(` Response Status: ${response.status()}`);
        // Use success_statuses array for consistency
        if (!success_statuses.includes(response.status()) && curl !== '') {    
            console.log(curl);
            test.info().attach('Curl', {
                body: curl,
                contentType: "application/json"
            });
        }
        return response;
    }
}
