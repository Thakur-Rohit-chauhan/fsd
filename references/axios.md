# Axios Reference

Source file: `axios-basics.js`

## `getJSON(url, config = {})`
Sends GET request and returns `response.data`.

Arguments:
- `url` (`string`): Full endpoint URL.
- `config` (`object`, optional): Axios config like `headers`, `params`, `timeout`.

Returns:
- Promise with response body.

Example:
```js
const data = await getJSON('https://jsonplaceholder.typicode.com/posts/1');
```

## `postJSON(url, payload = {}, config = {})`
Sends POST request with JSON body.

Arguments:
- `url` (`string`): Full endpoint URL.
- `payload` (`object`, optional): Request body object.
- `config` (`object`, optional): Axios request config.

Returns:
- Promise with response body.

Example:
```js
const post = await postJSON('https://jsonplaceholder.typicode.com/posts', { title: 'Hello' });
```

## `createApiClient(baseURL, token, timeoutMs = 5000)`
Creates reusable Axios instance.

Arguments:
- `baseURL` (`string`): Base API URL.
- `token` (`string`, optional): Bearer token; if present sets `Authorization` header.
- `timeoutMs` (`number`, optional): Timeout in milliseconds.

Returns:
- Axios instance.

Example:
```js
const api = createApiClient('https://api.example.com', 'TOKEN', 7000);
```
