const express = require('express');
const router = express.Router();
const verifyjwt = require('../middleware/jwtverify');
const { createOrderController, getOrdersControllers } = require('../controllers/orderController');

// Define routes correctly
router.route('/')
    .post(verifyjwt,createOrderController)
    .get(verifyjwt,getOrdersControllers);

module.exports = router;
