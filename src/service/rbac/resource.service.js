const { BAD_REQUEST, CONFLICT } = require("../../core/error.response");
const { findResource } = require("../../model/repository/resource.repo");
const resourceModel = require("../../model/resource.model");

class resourceService{
    static newResource=async ({name,slug,description})=>{
        const isResource=await findResource({name})
        if(isResource){
            throw new CONFLICT("Resource already exist!")
        }
        const result=await resourceModel.create({
            resource_name:name.toUpperCase(),
            resource_slug:slug,
            resource_description:description
        })
        if(result){
           return result 
        }else throw new BAD_REQUEST(`Couldn't create resource!`)
    }
  
    static listResources=async()=>{
        const result=await resourceModel.find().lean()
        return result
    }
}

module.exports=resourceService