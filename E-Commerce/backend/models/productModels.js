const mongoose = require('mongoose');

// Define product schema
const productSchema = new mongoose.Schema(
  {
    productname: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create Product model
const Product = mongoose.model('Product', productSchema);

// Export the Product model
module.exports = Product;
