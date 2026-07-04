const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.json()) 
app.use(cookieParser())


// requiring and using all routes
const authRouter = require('./routes/auth.routes')
app.use('/api/auth',authRouter)

app.get("/testing", (req, res) => {
    console.log("Test route hit");
    res.send("OK");
});

module.exports = app