const mongoose = require('mongoose')

const resumeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"]
  },
  phone: {
    type: String
  },
  location: {
    type: String
  },
  linkedin: {
    type: String
  },
  summary: {
    type: String
  },
  experience: {
    type: String
  },
  education: {
    type: String
  },
  skills: {
    type: String
  },
  projects: {
    type: String
  },
  htmlContent: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"]
  }
}, {
  timestamps: true
})

const resumeModel = mongoose.model("Resume", resumeSchema)

module.exports = resumeModel
