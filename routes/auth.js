const express = require('express')

const router = express.Router()



const {register, login, getSingleUser} = require('../controllers/auth')


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/user').get(getSingleUser)



module.exports = router

