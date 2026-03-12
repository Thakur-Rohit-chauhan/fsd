# Mongoose Reference

Source file: `mongoose-basics.js`

## `connectDB(uri)`
Connects Mongoose to MongoDB.

Arguments:
- `uri` (`string`): MongoDB connection string.

Returns:
- Promise that resolves when DB connection succeeds.

Example:
```js
await connectDB('mongodb://127.0.0.1:27017/mydb');
```

## `createUserModel()`
Creates or reuses the `User` model.

Arguments:
- None

Returns:
- Mongoose model for `User`.

Example:
```js
const User = createUserModel();
```

## `createUser(User, payload)`
Creates one user document.

Arguments:
- `User` (`Model`): User model.
- `payload` (`object`): Data object, usually `{ name, email }`.

Returns:
- Promise with created user document.

Example:
```js
await createUser(User, { name: 'Arnav', email: 'arnav@example.com' });
```

## `findUserByEmail(User, email)`
Finds a user by email.

Arguments:
- `User` (`Model`): User model.
- `email` (`string`): Email to find.

Returns:
- Promise with user document or `null`.

Example:
```js
const user = await findUserByEmail(User, 'arnav@example.com');
```
