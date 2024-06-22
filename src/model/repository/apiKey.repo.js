const { convertToObjectIdMongoDB } = require("../../utils")
const apiKeyModel = require("../apiKey.model")

const findKey=async(key)=>{
    const foundKey=await apiKeyModel.findOne({key:key})
    if(!foundKey){
        return false
    }
    return foundKey
}
module.exports={findKey}