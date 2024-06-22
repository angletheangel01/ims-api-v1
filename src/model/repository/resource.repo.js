const { convertToObjectIdMongoDB } = require("../../utils")
const resourceModel = require("../resource.model")

const findResource=async({name})=>{
    const foundResource=await resourceModel.findOne({
        resource_name:name.toUpperCase()
    })
    if(!foundResource){
        return false
    }
    return true
}
const findResourceById=async(resourceId)=>{
    const foundResource=await resourceModel.findById(convertToObjectIdMongoDB(resourceId))
    if(foundResource){
        return true
    }else return false
}
module.exports={
    findResource,
    findResourceById
}