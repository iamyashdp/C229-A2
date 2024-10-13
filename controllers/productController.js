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

//update by id
const updateProductByID = async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findByIdAndUpdate(productID, req.body, { new: true, runValidators: true });

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    res.status(200).send(product);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).send({ error: "Invalid product ID" });
    }

    res.status(400).send(err);
  }
};

// Delete all products from mongodb
const deleteAllProducts =  async (req, res) => {
  try {
    const result = await Product.deleteMany({});
    res.status(200).send({ message: `${result.deletedCount} products deleted successfully` });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete product by ID
const deleteProductByID = async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findByIdAndDelete(productID);

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    res.status(200).send({ message: "Product deleted successfully" });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).send({ error: "Invalid product ID" });
    }

    res.status(500).send(err);
  }
};


// Search products by name or get all products
const searchProductsByName = async (req, res) => {
  try {
    // Check if 'name' query exists
    const productName = req.query.name;
    console.log("Searching for product with name:", productName);
    // Initialize an empty query object
    let query = {};

    // If a name query parameter is provided, search by name using a case-insensitive regex, Case-insensitive search
    if (productName) {
      query.name = { $regex: productName, $options: 'i' };  
    }

    // Fetch products based on the query (either all products or filtered by name)
    const products = await Product.find(query);

    // Check if no products were found
    if (products.length === 0) {
      return res.status(404).send({ message: 'No products found' });
    }

    // Return the matching products
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({ error: 'An error occurred while searching for products' });
  }
};


module.exports = { createProduct, getProductsByID, updateProductByID, deleteAllProducts ,deleteProductByID, searchProductsByName };
