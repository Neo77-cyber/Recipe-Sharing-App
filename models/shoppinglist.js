const mongoose = require('mongoose')



const ShoppingListSchema = new mongoose.Schema (  {
    name: {
        type: String,
        required: [true, 'Please provide name of item'],
        maxlength: 50,
      },
      amount: {
        type: String,
        required: [true, 'Please provide amount'],
        maxlength: 100,
      },
      unit: {
        type: String,
        required: [true, 'Please provide the units'],
        maxlength: 1000,
        
      },
      createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
      },
    },
    { timestamps: true }
    )

module.exports = mongoose.model('ShoppingList', ShoppingListSchema)