require("dotenv").config();
const app = require("./src/app")
const connectToDB = require('./src/config/database')
const generateInterviewReport = require("./src/services/ai.service")
const { resume, jobDescription, selfDescription } = require("./src/services/temp")

connectToDB()
generateInterviewReport({resume, jobDescription, selfDescription})

app.listen(6767,()=>{
  console.log('Server running on port 6767')  
})
