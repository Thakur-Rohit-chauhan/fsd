# Multer Reference

Source file: `multer-basics.js`

## `createMemoryUploader(maxFileSizeBytes = 2 * 1024 * 1024)`
Creates Multer uploader with memory storage.

Arguments:
- `maxFileSizeBytes` (`number`, optional): Max upload size in bytes. Default `2MB`.

Returns:
- Multer uploader instance.

Example:
```js
const upload = createMemoryUploader(2 * 1024 * 1024);
```

## `singleFileUpload(fieldName = 'file', maxFileSizeBytes = 2 * 1024 * 1024)`
Creates middleware for uploading one file.

Arguments:
- `fieldName` (`string`, optional): Form field name containing file.
- `maxFileSizeBytes` (`number`, optional): Max size in bytes.

Returns:
- Express middleware function.

Example:
```js
app.post('/upload', singleFileUpload('avatar', 2 * 1024 * 1024), (req, res) => {
  res.json({ fileName: req.file?.originalname });
});
```
