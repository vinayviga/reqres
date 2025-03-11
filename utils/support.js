export function curlExtractor(url, method, headers, body) {
   

    let curlCommand = `curl -X ${method} '${url}' \\\n`;

    for (const [key, value] of Object.entries(headers)) {
        curlCommand += `    -H '${key}: ${value}' \\\n`;
    }

    if (body && Object.keys(body).length) {
        curlCommand += `    --data '${JSON.stringify(body)}'`;
    }

    //console.log(curlCommand);
    return curlCommand;
}