const express = require('express')

const router = express.Router();
const authController = require('./../controller/authController')

router.route('/signup').post(authController.signingTheUser)
router.route('/login').post(authController.login)
router.route('/all-users').get(authController.AllUsers)




module.exports = router;