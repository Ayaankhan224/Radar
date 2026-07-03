const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username:{
    type: string,
    unique: [true,"Username already taken"],
    required: true
  },
  email:{
    type: string,
    unique: [true,"Email already exists"],
    required: true
  },
  password:{
    type: string,
    required: true
  }
})

const userModel = mongoose.model('users',userSchema)

module.exports = userModel