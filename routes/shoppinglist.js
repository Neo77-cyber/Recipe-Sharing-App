const express = require('express')


const router = express.Router()

const {createShoppingList, getUserShoppingList} = require('../controllers/shoppinglist')





router.route('/').post(createShoppingList).get(getUserShoppingList)







module.exports = router