const Recipe = require('../models/recipe')
const User = require('../models/auth')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const cloudinary = require('cloudinary').v2;
const fs = require('fs');





const CreateRecipe = async (req, res) => {

    req.body.createdBy = req.user.userId
    const recipe = await Recipe.create({...req.body})

    res.status(StatusCodes.CREATED).json({recipe})
}

const getAllRecipe = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10; 
  
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
  
    const totalRecipes = await Recipe.countDocuments();
  
    const recipes = await Recipe.find({})
      .sort({ createdAt: -1 }) 
      .skip(startIndex)
      .limit(itemsPerPage);
  
    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalRecipes / itemsPerPage),
    };
  
    res.status(StatusCodes.OK).json({ recipes, pagination });
  };
  


const getSingleRecipe = async (req, res) => {
    const {
        
        params: { id: recipeId },
      } = req
    
      const recipe = await Recipe.findOne({
        _id: recipeId,
        
      }).populate('createdBy', 'name')

      if (!recipe) {
        throw new NotFoundError(`No recipe with id ${recipeId}`)
      }
      res.status(StatusCodes.OK).json({ recipe })

  }

const getUserRecipe = async (req, res) => {

    const userRecipe = await Recipe.find({createdBy:req.user.userId}).sort('createdAt')

    return res.status(StatusCodes.OK).json({userRecipe, count: userRecipe.length})

}


const updateRecipe = async (req, res) => {
    const {
        body: {name, description, Ingredients, Steps, Tips },
        params: {id:recipeId},
        user: userId
    } = req
    console.log(userId);
    if (name === '' || description === '' || Ingredients === '' || Steps === '' || Tips === ''){
        throw new BadRequestError('please provide the credentials')
    }
    const recipe = await Recipe.findByIdAndUpdate({
        _id: recipeId,
        createdBy: userId
    },
        req.body,
        { new: true, runValidators: true }
        )
    if (!recipe){
        throw new NotFoundError(`No recipe with ${recipeId}`)
    }

    res.status(StatusCodes.OK).json({recipe})
}


const DeleteRecipe = async (req, res) => {
    const {
        params: {id:recipeId},
        user: userId
    } = req

    const recipe = await Recipe.findByIdAndRemove({
        _id:recipeId,
        createdBy: userId
    })
    if (!recipe) {
        throw new NotFoundError(`No Recipe with ${recipeId}`)
    }
    res.status(StatusCodes.OK).send()
}

const savedRecipe = async (req, res) => {
    const {
        params: {id:recipeId},
        user: { userId }
    } = req

    const recipe = await Recipe.findById({
        _id:recipeId
    })

    if (!recipe) {
        throw new NotFoundError(`No Recipe with ${recipeId}`)
    }
    const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { savedRecipes: recipeId } },
        { new: true }
    )

    res.status(StatusCodes.OK).json({user})
}

const uploadRecipeImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      
      {
        use_filename: true,
        folder: 'file-upload',
      }
      
    );
    
    fs.unlinkSync(req.files.image.tempFilePath);
    return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
  };
  
const searchRecipe = async (req,res) => {
    const {name} = req.query

    if (!name) {
        throw new BadRequestError('Please provide a name')
    }

    const recipe = await Recipe.find({name: { $regex: name, $options: 'i' }})

    if (recipe.length === 0){
        throw new NotFoundError('No recipe found with that name')
    }
    return res.status(StatusCodes.OK).json({recipe})

}









module.exports = {CreateRecipe, getAllRecipe, getSingleRecipe, updateRecipe, DeleteRecipe, savedRecipe, uploadRecipeImage, searchRecipe, getUserRecipe}