const express = require('express');
const { createProduct, getAllProducts, getProductsByID } = require('../controllers/productController');
const router = express.Router();

// Define the routes for creating and fetching products
router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductsByID);


module.exports = router;
