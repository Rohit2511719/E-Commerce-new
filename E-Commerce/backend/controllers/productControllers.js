const Product = require('../models/productModels.js'); // Assuming you're using Mongoose for MongoDB
const path = require('path');

// Add Product
exports.addProduct = async (req, res) => {
  const { productname, productPrice, productDescription, productCategory } = req.body;
  const productImage = req.file ? req.file.filename : null;

  const newProduct = new Product({
    productname,
    productPrice,
    productDescription,
    productCategory,    
    productImage
  });

  try {
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  const { productname, productPrice, productDescription, productCategory } = req.body;
  const productImage = req.file ? req.file.filename : req.body.productImage; // If image is not uploaded, keep the existing one.

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productname,
        productPrice,
        productDescription,
        productCategory,
        productImage
      },
      { new: true }
    );
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json({ products }); // Send the products as a response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
