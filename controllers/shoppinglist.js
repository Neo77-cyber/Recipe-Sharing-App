const ShoppingList = require('../models/shoppinglist')
const {StatusCodes} = require('http-status-codes')




const createShoppingList = async (req, res) => {
    req.body.createdBy = req.user.userId
    const shoppinglist = await ShoppingList.create({...req.body})
    
    return res.status(StatusCodes.OK).json({shoppinglist})
    
}

const getUserShoppingList = async (req, res) => {
    const usershoppinglist = await ShoppingList.find({createdBy : req.user.userId}).sort('createdAt')

    return res.status(StatusCodes.OK).json({usershoppinglist})
}

module.exports = {createShoppingList, getUserShoppingList}