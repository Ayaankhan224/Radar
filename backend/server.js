require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const app = require("./src/app")
const connectToDB = require('./src/config/database')

connectToDB()

app.listen(6767,()=>{
  console.log('Server running on port 6767')  
})
