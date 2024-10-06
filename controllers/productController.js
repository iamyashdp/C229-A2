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
    products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err);
  }

};

// Get products by ID
const getProductsByID = async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findById(productID);

    if (!product) {
      return res.status(404).send({ error: "product not found" });
    }

    res.status(200).send(product);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).send({ error: "product not found" });
    }

    res.status(500).send(err);
  }
};




module.exports = { createProduct, getAllProducts, getProductsByID };
