const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name of recipe'],
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
      maxlength: 100,
    },
    Ingredients: {
      type: String,
      required: [true, 'Please provide Ingredients'],
      maxlength: 1000,
      
    },
    Steps: {
        type: String,
        required: [true, 'Please provide steps'],
        maxlength: 1000,
        
      },
    Tips: {
        type: String,
        maxlength: 1000,
        
      },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Recipe', RecipeSchema)