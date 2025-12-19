const express = require('express');
const router = express.Router();
const verifyjwt = require('../middleware/jwtverify');
const {getBurgers,createBurgers,deleteBurger,updateBurgers} = require('../controllers/burgerController');

// Correctly define the route for GET request
router.route('/')
        .get(getBurgers)
        .post(verifyjwt,createBurgers)
router.route('/:id')
       .delete(verifyjwt,deleteBurger)
       .put(verifyjwt,updateBurgers)

module.exports = router;
