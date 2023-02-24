'use strict'

const express = require("express");
const router = express.Router()
const loginController = require('../controller/login.controller.js')

router.post('/create', loginController.createUser)
router.post('/login', loginController.login)
router.post('/auth/verify', loginController.authVerify)
router.put('/logout', loginController.logout)

module.exports = router;