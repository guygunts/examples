var express = require('express');
const router = express.Router();
const order =require('../src/controller/orderController')
router.get('/listnorder',order.listnorder)
router.post('/addorder',order.addorder)
router.patch('/updateorder',order.updateorder)
module.exports = router;
