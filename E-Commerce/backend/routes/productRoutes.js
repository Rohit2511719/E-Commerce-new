const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); // Import the 'path' module to handle file extensions
const { addProduct, updateProduct, deleteProduct, getProducts } = require('../controllers/productControllers'); // Add getProducts to import

// Set up file storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Make sure the uploads directory exists
    cb(null, 'uploads/'); // Save to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Use timestamp to avoid filename conflicts
    cb(null, Date.now() + path.extname(file.originalname)); // Add the extension from the original file name
  }
});

// Initialize the multer upload with the storage configuration
const upload = multer({ storage: storage });

// Routes
router.get('/get', getProducts);  // GET for fetching all products
router.post('/save', upload.single('productImage'), addProduct);  // POST for adding a product
router.put('/update/:id', upload.single('productImage'), updateProduct);  // PUT for editing a product
router.delete('/delete/:id', deleteProduct);  // DELETE for deleting a product

module.exports = router;
