const express = require('express')
require('dotenv').config()
require('express-async-errors')
const fileUpload = require('express-fileupload');




const app = express()


const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.json())





const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authMiddleware = require('./middleware/authentication')
const authroute = require('./routes/auth')
const recipeRoute = require('./routes/recipe')
const shoppingListRoute = require('./routes/shoppinglist')
const getUser = require('./routes/user')


app.use(fileUpload({ useTempFiles: true }));
app.use('/api/v1', authroute)
app.use('/api/v1/recipe', authMiddleware, recipeRoute)
app.use('/api/v1/shoppinglist', authMiddleware, shoppingListRoute)
app.use('/api/v1/getuser', authMiddleware, getUser)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)






const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
















