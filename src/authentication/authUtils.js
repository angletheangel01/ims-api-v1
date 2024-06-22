const { FORBIDDEN } = require("../core/error.response")
const { findKey } = require("../model/repository/apiKey.repo")

const HEADER={
    API_KEY:`x-api-key`
}
const apiKeyCheck=async(req,res,next)=>{
    const key=req.headers[HEADER.API_KEY]?.toString()
    if(!key){
        throw new FORBIDDEN(`Input API key`)
    }
    const foundKey=await findKey(key)
    if(!foundKey){
        throw new FORBIDDEN(`API key no found`)
    }
    return next()

}
module.exports={apiKeyCheck}