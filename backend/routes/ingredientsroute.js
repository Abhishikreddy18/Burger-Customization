const express=require('express')
const router=express.Router()
const {getingredients,deleteingredient,createingredient,updateingredient}=require('../controllers/ingredientsController')
router.route('/')
    .get(getingredients)
    .post(createingredient)
    .put(updateingredient)
router.route('/:id')
   .delete(deleteingredient)

module.exports=router;