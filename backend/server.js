require('dotenv').config()
const app = require("./src/app")
const connectToDB = require('./src/config/database')

connectToDB()

app.listen(6767,()=>{
  console.log('Server running on port 6767')  
})
