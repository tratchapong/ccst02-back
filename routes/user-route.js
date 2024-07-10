const express = require('express')
const userRoute = express.Router()
const userController = require('../controllers/user-controller')
const upload = require('../middlewares/upload')

userRoute.put('/', upload.single('picture'), userController.updateProfile)

module.exports = userRoute