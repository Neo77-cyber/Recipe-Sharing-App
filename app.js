const express = require('express')
require('dotenv').config()
require('express-async-errors')




const app = express()
app.use(express.json())

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});



const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authMiddleware = require('./middleware/authentication')
const authroute = require('./routes/auth')
const recipeRoute = require('./routes/recipe')



app.use('/api/v1', authroute)
app.use('/api/v1/recipe', authMiddleware, recipeRoute)
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
















