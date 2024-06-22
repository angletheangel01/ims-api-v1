const express=require(`express`)
const { uuid } = require('uuidv4');
const { default: helmet } = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const swaggerUi=require(`swagger-ui-express`)
const swaggerSpec = require('./swaggerConfig')
const { NOT_FOUND } = require('./core/error.response')
const Logger=require(`./middleware/log/logger.middleware`)
require(`./database/init.mongoDB`)
const app=express()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use((req,res,next)=>{
    const requestId=req.header(`x-request-id`)
    req.requestId=requestId ? requestId:uuid()
    Logger.log(`input params::${req.method}::`,[
        req.path,
        {requestId:req.requestId},
        req.method===`POST` ? req.body :req.query
    ])
    next()
})
app.use('/',require('./route'))
app.use((req,res,next)=>{
    const error=new NOT_FOUND()
    next(error)
})
app.use((error,req,res,next)=>{
    console.log(error)
    const statusCode=error.status || 500
    return res.status(statusCode).json({
        code:statusCode,
        message:error.message||"Internal Server Error",
        stack: error.stack ? error.stack.split('\n') : []
    })
})
module.exports=app

