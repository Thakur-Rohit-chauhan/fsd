# Bcrypt Reference

Source file: `bcrypt-basics.js`

## `hashPassword(password, saltRounds = 10)`
Converts a plain password into a bcrypt hash.

Arguments:
- `password` (`string`): Plain user password.
- `saltRounds` (`number`, optional): Cost factor, default `10`.

Returns:
- Promise with hashed password string.

Example:
```js
const hash = await hashPassword('myPass123', 10);
```

## `comparePassword(password, hashedPassword)`
Compares plain password with stored hash.

Arguments:
- `password` (`string`): Plain password from login.
- `hashedPassword` (`string`): Hash from database.

Returns:
- Promise with `true` or `false`.

Example:
```js
const ok = await comparePassword('myPass123', hash);
```
