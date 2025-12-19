const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true,
    default: 0
  }
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
