# UUID Reference

Source file: `uuid-basics.js`

## `generateId()`
Generates random UUID v4.

Arguments:
- None

Returns:
- UUID string.

Example:
```js
const id = generateId();
```

## `validateId(id)`
Checks if given value is valid UUID.

Arguments:
- `id` (`string`): Value to validate.

Returns:
- `true` if valid UUID, else `false`.

Example:
```js
const ok = validateId(id);
```
