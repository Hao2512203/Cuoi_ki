const express = require('express')

const userController = require('../controls/userController')

const router = express.Router()

router.post('/register', userController.registerUser)

router.post('/login',userController.loginUser)

router.post('/logout',userController.logout)

module.exports = router