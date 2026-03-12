# JWT Reference

Source file: `jwt-basics.js`

## `signAccessToken(payload, secret, expiresIn = '1h')`
Creates a signed JWT token.

Arguments:
- `payload` (`object`): Data inside token.
- `secret` (`string`): Signing key.
- `expiresIn` (`string | number`, optional): Token expiry (`'15m'`, `'1h'`, `'7d'`, `3600`).

Returns:
- Token string.

Example:
```js
const token = signAccessToken({ userId: 'u1' }, 'MY_SECRET', '1h');
```

## `verifyAccessToken(token, secret)`
Verifies token signature and expiry.

Arguments:
- `token` (`string`): JWT string.
- `secret` (`string`): Same key used in signing.

Returns:
- Decoded payload if valid.

Note:
- Throws error for invalid or expired token.

Example:
```js
const payload = verifyAccessToken(token, 'MY_SECRET');
```

## `decodeTokenWithoutVerify(token)`
Decodes token without checking signature.

Arguments:
- `token` (`string`): JWT string.

Returns:
- Decoded value or `null`.

Note:
- Do not use this for authentication checks.

Example:
```js
const decoded = decodeTokenWithoutVerify(token);
```
