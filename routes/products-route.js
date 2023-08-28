const express = require('express');
const router = express.Router();

const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/products-controller');

// READ
router.get('/', getAllProducts);   
router.get('/:id', getProductById);

// CREATE
router.post('/', createProduct);

// UPDATE
router.put('/:id', updateProduct);

// DELETE
router.delete('/:id', deleteProduct);


module.exports = router;