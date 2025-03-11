import { curlExtractor } from './support.js';
import { test } from './fixtures.js';
let curl = '';
export class APIService {
    
    constructor(request) {
        this.request = request;
    }
    
    async get(url, headers = {}) {
        console.log(`GET Request: ${url}`);
        const response = await this.request.get(url, { headers });
        if(response.status() !== 200)
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
        //listing all possible success status codes
        if(![200, 201].includes(response.status()))
        {
           curl =  curlExtractor(url, 'POST', headers, body);
        }
        return this.handleResponse(response, curl);
    }

    async put(url, headers = {}, body = {}) {
        console.log(`PUT Request: ${url}`);

        const response = await this.request.put(url, {
            headers,
            data: body
        });
        if(response.status() !== 200)
            {
               curl = curlExtractor(url, 'PUT', headers, body);
            }
        return this.handleResponse(response, curl);
    }

    async delete(url, headers = {}) {
        console.log(`DELETE Request: ${url}`);

        const response = await this.request.delete(url, { headers });
        //listing all possible success status codes
        if(![200, 204, 202].includes(response.status()))
            {
               curl = curlExtractor(url, 'DELETE', headers, null);
            }
        return this.handleResponse(response, curl);
    }

    async handleResponse(response, curl) {
        console.log(` Response Status: ${response.status()}`);
       if(curl !== '')
        {    
         //console.log(curl);
         test.info().attach('Curl', {
            body: curl,
            contentType: "application/json"
        });
        }
        return response;
    }
}
