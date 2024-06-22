const { BAD_REQUEST } = require("../core/error.response")
const apiKeyModel = require("../model/apiKey.model")
const userModel = require("../model/user.model")
const crypto=require(`crypto`)
class apiKeyService{
    static createApiKey = async({
        userId,
        rateLimit
        })=>{
        const key= crypto.randomBytes(16).toString('hex');
        rateLimit=rateLimit<0 ? 0 : rateLimit
        const foundUser=await userModel.findById(userId)
        if(!foundUser){
            throw new BAD_REQUEST(`User no found`)
        }
        const newKey=await apiKeyModel.create({
            key:key,
            userId:userId,
            rateLimit:rateLimit,
        })
        return newKey
    }
}
module.exports=apiKeyService