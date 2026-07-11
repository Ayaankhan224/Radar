const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors')

const allowedOrigins = [
    "http://localhost:5173",
    "https://radar-woad.vercel.app",
    process.env.FRONTEND_URL,
    process.env.CLIENT_URL
].filter(Boolean)

app.set('trust proxy', 1)
app.use(express.json()) 
app.use(cookieParser())
app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        return callback(new Error(`Origin ${origin} is not allowed by CORS`))
    },
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
