require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const app = require("./src/app")
const connectToDB = require('./src/config/database')

connectToDB()

const PORT = process.env.PORT || 6767

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)  
})
