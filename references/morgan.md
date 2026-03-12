# Morgan Reference

Source file: `morgan-basics.js`

## `createDevLogger()`
Creates short colorful logs for development.

Arguments:
- None

Returns:
- Express middleware function.

Example:
```js
app.use(createDevLogger());
```

## `createCombinedLogger()`
Creates detailed Apache-style logs.

Arguments:
- None

Returns:
- Express middleware function.

Example:
```js
app.use(createCombinedLogger());
```

## `createCustomLogger(format = ':method :url :status :response-time ms')`
Creates logger with custom format string.

Arguments:
- `format` (`string`, optional): Morgan token format string.

Returns:
- Express middleware function.

Example:
```js
app.use(createCustomLogger(':method :url :status'));
```
