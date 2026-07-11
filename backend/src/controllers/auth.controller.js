const userModel = require("../models/user.model")
const tokenBlacklistModel = require('../models/blacklist.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const isProduction = process.env.NODE_ENV === 'production'
const authCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  maxAge: 24 * 60 * 60 * 1000
}

const clearAuthCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax'
}

/**
 * @name registerUserController
 * @description registers new user, expects usrname, email, passwd
 * @access Public
 */
async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide all details",
    });
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    if (isUserAlreadyExists.username == username) {
      return res.status(400).json({
        message: "User already exists",
      })
    }
    else if(isUserAlreadyExists.email == email){
      return res.status(400).json({
      message: 'Email already exists'
      })
    }
  }

  const hash = await bcrypt.hash(password,10)

  const user = await userModel.create({
    username,
    email,
    password: hash
  })

  const token = jwt.sign(
    {id: user._id, username: user.username},
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
  )

  res.cookie('token', token, authCookieOptions)

  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: user._id,
      username: user._username,
      email: user.email
    }
  })
}


/**
 * @name loginUserController
 * @description login a user, expects email and passwd
 * @access Public
 */
async function loginUserController(req, res){
  const {email, password} = req.body

  const user = await userModel.findOne({email})

  if(!user){
    return res.status(400).json({
      message: 'Invalid email or password'
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if(!isPasswordValid){
    return res.status(400).json({
      message: 'Incorrect email or password'
    })
  }

  const token = jwt.sign(
    {id: user._id, username: user.username},
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
  )

  res.cookie('token', token, authCookieOptions)

  res.status(200).json({
    message: 'User logged in',
    user:{
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}

/**
 * @name logoutUserController
 * @description clear token from user cookie and add token to blacklist
 * @access Public
 */
async function logoutUserController(req, res){
  const token = req.cookies.token

  if(token){
    await tokenBlacklistModel.create({token})
  }

  res.clearCookie('token', clearAuthCookieOptions)

  res.status(200).json({
    message: 'User logged out'
  })
}

/**
 * @name getMeController
 * @description get the current logged in user details
 */
async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id)

  res.status(200).json({
    message: "User details fetched successfully",
    user:{
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}


module.exports = { 
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController
}
