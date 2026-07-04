const {Router} = require('express')
const authRouter = Router()
const authController = require('../controllers/auth.controller')

/**
 * @route POST api/auth/register
 * @description Register a new user
 * @access Public 
 */
authRouter.post('/register',authController.registerUserController)


/**
 * @route POST api/auth/login
 * @description Login a user
 * @access Public 
 */
authRouter.post('/login',authController.loginUserController)

/**
 * @route GET api/auth/logout
 * @description loggin out the user
 * @access Public 
 */
authRouter.post('/logout',authController.logoutUserController)



module.exports = authRouter