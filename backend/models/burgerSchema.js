const mongoose = require('mongoose');
const User=require('../models/Users')
const Schema = mongoose.Schema;

// Define the Address sub-schema
const addressSchema = new Schema({
    number: { type: String },
    line1: { type: String },
    country: { type: String },
  line2: { type: String },
  postcode: { type: String },
});

// Define the main Burger schema
const burgerSchema = new Schema({
User:{ type:mongoose.Schema.Types.ObjectId,required:true,ref:User},
  name: { type: String, required: true },
  restaurant: { type: String, required: true },
  web: { type: String,default:"burger-king"},
  description: { type: String, required: true },
  ingredients: { type: [String], required: true },
  addresses: { type: [addressSchema], required: true }
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }    
});

// Create the model from the schema
const Burger = mongoose.model('Burger', burgerSchema);

module.exports = Burger;
