const Product = require('../models/product');

// Create a new product
const createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get all products from mongodb
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err);
  }
};



module.exports = { createProduct, getAllProducts };
