const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors')


app.use(express.json()) 
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

const authRouter = require('./routes/auth.routes')
app.use('/api/auth',authRouter)

const interviewRouter = require('./routes/interview.routes')
app.use('/api/interview',interviewRouter)

const resumeRouter = require('./routes/resume.routes')
app.use('/api/resume', resumeRouter)

app.get("/testing", (req, res) => {
    console.log("Test route hit");
    res.send("OK");
});

module.exports = app