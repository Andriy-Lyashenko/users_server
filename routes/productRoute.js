const express = require('express')
const route = express.Router();

const {createProduct, getProducts, deleteProduct} = require('../controllers/productController');
const checkAuth = require('../middlewares/check.auth')


route.post('/',checkAuth, createProduct);
route.get('/', checkAuth, getProducts);
route.delete('/:id',checkAuth, deleteProduct)


module.exports = route;