// routes.js
const express = require('express');
const upload = require('./uploadConfig');
const router = express.Router();

// Route to handle image uploads
router.post('/upload-image', upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({ message: 'Image uploaded successfully', filePath: req.file.path });
  } else {
    res.status(400).json({ message: 'Image upload failed' });
  }
});

module.exports = router;
