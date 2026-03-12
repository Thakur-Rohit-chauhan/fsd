# Dotenv Reference

Source file: `dotenv-basics.js`

## `loadEnv(path = '.env')`
Loads env values from file into `process.env`.

Arguments:
- `path` (`string`, optional): Path to env file. Default `.env`.

Returns:
- Dotenv result object (`parsed` or `error`).

Example:
```js
loadEnv('.env');
```

## `getEnv(name, fallback = '')`
Reads an environment variable with fallback.

Arguments:
- `name` (`string`): Env key (`PORT`, `JWT_SECRET`, etc).
- `fallback` (`string`, optional): Default value if key is missing.

Returns:
- String value from env or fallback.

Example:
```js
const port = getEnv('PORT', '3000');
```
