# Joi Reference

Source file: `joi-basics.js`

## `createSignupSchema()`
Creates Joi schema for signup validation.

Rules:
- `name`: required string, minimum 2 characters.
- `email`: required valid email.
- `password`: required string, minimum 6 characters.

Arguments:
- None

Returns:
- Joi object schema.

Example:
```js
const schema = createSignupSchema();
```

## `validateData(schema, data)`
Validates data using schema.

Arguments:
- `schema` (`Schema`): Joi schema.
- `data` (`object`): Input object to validate.

Returns:
- Joi validation result object (`value`, `error`).

Example:
```js
const result = validateData(schema, {
  name: 'Arnav',
  email: 'arnav@example.com',
  password: 'secret123',
});
```
