const expressAsyncHandler = require('express-async-handler');
const initialIngredients=require('../models/initialIngredients')
 const getingredients=expressAsyncHandler(async(req,res)=>{
    try{
        const ingredients=await initialIngredients.find()
        res.json(ingredients)
    }
    catch(error){
        res.status(400).json({message:'Error getting ingredients',error:error.message})
    }
 })
const deleteingredient=expressAsyncHandler(async(req,res)=>{
    try{
        const ingredient=await initialIngredients.findById(req.params.id)
        await ingredient.remove()
        res.json({message:'ingredient removed',ingredient:ingredient})
    }
    catch(error){
        res.status(400).json({message:'Error deleting ingredient',error:error.message})
    }
 })
 const createingredient = expressAsyncHandler(async (req, res) => {
    const { name,price } = req.body;
    console.log(name,price);

    try {
        const existingIngredient = await initialIngredients.findOne({ name });
        if (existingIngredient) {
            return res.status(400).json({ message: 'Ingredient already exists' });
        }

        const newIngredient = new initialIngredients({
            name,
            price
        });

        const savedIngredient = await newIngredient.save();
        res.status(201).json({ message: 'Ingredient created', ingredient: savedIngredient });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error creating ingredient', error: error.message });
    }
});
const updateingredient=expressAsyncHandler(async(req,res)=>{
    const {id,name,price}=req.body
    console.log(req.body)
    try{
        const ingredient=await initialIngredients.findById(id)
        ingredient.name=name
        ingredient.price=price
        await ingredient.save()
        console.log(ingredient)
        res.json({message:'ingredient updated',ingredient:ingredient})
    }
    catch(error){
        console.log(error)
        res.status(400).json({message:'Error updating ingredient',error:error.message})
    }
})
module.exports={getingredients,deleteingredient,createingredient,updateingredient}