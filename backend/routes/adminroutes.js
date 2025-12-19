const express = require('express');
const router = express.Router();
const verifyjwt = require('../middleware/jwtverify');
const {getallOrdersControllers,updateorderControllers}=require('../controllers/adminController')
// Define routes correctly
router.route('/orders')
    .get(verifyjwt,getallOrdersControllers)
    router.post('/orders/:id', verifyjwt,updateorderControllers);

module.exports = router;
