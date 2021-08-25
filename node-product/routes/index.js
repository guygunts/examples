var express = require('express');
const router = express.Router();
const product =require('../src/controller/productController')
router.get('/product',product.listproduct)
module.exports = router;
