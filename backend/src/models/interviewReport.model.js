const mongoose = require('mongoose')

/**
 * INP
 * - job desc schema: String
 * - resume text: String
 * - self desc: String
 * 
 * 
 * OUTP
 * - score: Number
 * - technical quesns: [{ question: "", intention: "", answer: "" }]
 * - behavioral quesns: [{ question: "", intention: "", answer: "" }]
 * - skill gap: [{ skill: "", severity: {type: String, enum: ["low", "medium", "high"]} }]
 * - prep plan: [{ day: Number, focus: String, tasks: [String] }]
 */

const technicalQuestionsSchema = new mongoose.Schema({
  question:{
    type: String,
    required: [true, "Technical questions required"]
  },
  intention:{
    type: String,
    required: [true, "Intention required"]
  },
  answer:{
    type: String,
    required: [true, "Answer required"]
  }
},{
  _id: false
})

const behavioralQuestionsSchema = new mongoose.Schema({
  question:{
    type: String,
    required: [true, "Behvioral questions required"]
  },
  intention:{
    type: String,
    required: [true, "Intention required"]
  },
  answer:{
    type: String,
    required: [true, "Answer required"]
  }
},{
  _id: false
})

const skillGapSchema = new mongoose.Schema({
  skill:{
    type: String,
    required: [true, "Skills required"]
  },
  severity:{
    type: String,
    enum: ["low","medium","high"],
    required: [true, "Severity required"]
  }
},{
  _id: false
})

const preparationPlanSchema = new mongoose.Schema({
  day:{
    type: Number,
    required: [true, "Day is required"]
  },
  focus:{
    type: String,
    required: [true, "Focus required"]
  },
  tasks:{
    type: [String],
    required: [true, "Tasks required"]
  }
},{
  _id: false
})

const interviewReportSchema = new mongoose.Schema({
  jobDescription: {
    type: String,
    required: [true, "Please enter job description"]
  },
  resume: {
    type: String
  },
  selfDescription:{
    type: String
  },
  score:{
    type: Number,
    min: 0,
    max: 100
  },
  technicalQuestions:[ technicalQuestionsSchema],
  behavioralQuestions: [ behavioralQuestionsSchema ],
  skillGap: [skillGapSchema],
  preparationPlan: [ preparationPlanSchema ],
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title:{
    type: String,
    required: [true, "Job title is required"]
  }
},{
  timestamps: true
})

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema)

module.exports = interviewReportModel
