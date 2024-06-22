const app=require(`./src/app`)
const { port } = require("./src/config/config.mongoDB")
app.listen(3000,()=>console.log(`Server Listening On Port ${port}`))
    