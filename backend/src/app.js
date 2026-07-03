const express = require('express')
const app = express()

app.use(express.json()) 


// requiring and using all routes

 */
const authRouter = require('./routes/auth.routes')
app.use('/api/auth',authRouter)

module.exports = app