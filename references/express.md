# Express Reference

Source file: `express-basics.js`

## `createApp()`
Creates a new Express app and enables `express.json()` middleware.

Arguments:
- None

Returns:
- Express app instance.

Example:
```js
const { createApp } = require('./express-basics');
const app = createApp();
```

## `registerRoutes(app)`
Attaches demo routes to an app.

Arguments:
- `app` (`Express`): App instance returned from `createApp()`.

What it adds:
- `GET /health` -> `{ ok: true, message: 'Server is healthy' }`
- `POST /echo` -> returns request JSON body.

Returns:
- Nothing (`undefined`).

Example:
```js
const app = createApp();
registerRoutes(app);
```

## `startServer(app, port = 3000)`
Starts HTTP server.

Arguments:
- `app` (`Express`): App to start.
- `port` (`number`, optional): Port number, default `3000`.

Returns:
- Node HTTP server instance.

Example:
```js
startServer(app, 3000);
```
