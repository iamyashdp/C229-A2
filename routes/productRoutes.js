const express = require('express');
const { createProduct, 
    getAllProducts, 
    getProductsByID, 
    deleteAllProducts, 
    deleteProductByID } = require('../controllers/productController');
const router = express.Router();

// Define the routes for creating and fetching products
router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductsByID);
router.delete('/products', deleteAllProducts);
router.delete('/products/:id', deleteProductByID);



module.exports = router;
