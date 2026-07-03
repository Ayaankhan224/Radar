const {Routes} = require('express')

const authRouter = Router()

/**
 * @name registerUser
 * @route POST api/auth/routes
 * @description Register a new user
 * @access Public 
 */
authRouter.post('/register',(req, res)=>{

})

module.exports = authRouter