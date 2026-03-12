# CORS Reference

Source file: `cors-basics.js`

## `createCorsMiddleware(allowedOrigins = [], allowCredentials = true)`
Creates CORS middleware with allow-list origin checking.

Arguments:
- `allowedOrigins` (`string[]`, optional): Allowed frontend origins.
- `allowCredentials` (`boolean`, optional): Whether credentials (cookies/auth) are allowed.

Returns:
- Express middleware function.

Behavior:
- Allows requests when `Origin` is in allow-list.
- Also allows no-origin requests (Postman/cURL).
- Rejects other browser origins.

Example:
```js
app.use(createCorsMiddleware(['http://localhost:5173'], true));
```
