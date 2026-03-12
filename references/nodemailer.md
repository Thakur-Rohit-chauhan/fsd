# Nodemailer Reference

Source file: `nodemailer-basics.js`

## `createTransporter(host, port, user, pass)`
Creates SMTP transporter.

Arguments:
- `host` (`string`): SMTP host (`smtp.gmail.com`, etc).
- `port` (`number`): SMTP port (`465` secure, `587` STARTTLS).
- `user` (`string`): SMTP username/email.
- `pass` (`string`): SMTP password or app password.

Returns:
- Nodemailer transporter.

Example:
```js
const transporter = createTransporter('smtp.gmail.com', 465, 'me@gmail.com', 'app_password');
```

## `sendMail(transporter, options)`
Sends an email.

Arguments:
- `transporter` (`Transporter`): Created by `createTransporter()`.
- `options` (`object`):
  - `from` (`string`): Sender email.
  - `to` (`string`): Receiver email.
  - `subject` (`string`): Mail subject.
  - `text` (`string`): Plain text body.

Returns:
- Promise with send result.

Example:
```js
await sendMail(transporter, {
  from: 'me@gmail.com',
  to: 'you@example.com',
  subject: 'Hello',
  text: 'This is a test',
});
```
