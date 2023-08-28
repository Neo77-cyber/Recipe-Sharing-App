const express = require('express')


const router = express.Router()

const {CreateRecipe, getAllRecipe, getSingleRecipe, updateRecipe, DeleteRecipe, savedRecipe, uploadRecipeImage, searchRecipe, getUserRecipe} = require('../controllers/recipe')




router.route('/').post(CreateRecipe).get(getAllRecipe)
router.route('/search').get(searchRecipe)
router.route('/usersrecipe').get(getUserRecipe)
router.route('/:id').get(getSingleRecipe).patch(updateRecipe).delete(DeleteRecipe)
router.patch('/:id/save', savedRecipe);
router.route('/upload').post(uploadRecipeImage)








module.exports = router