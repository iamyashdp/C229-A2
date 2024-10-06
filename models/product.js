const mongoose = require('mongoose');

// Define the schema for the product
const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: String,
  price: { 
    type: Number, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true },
  category: String,
});

// Create a model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
