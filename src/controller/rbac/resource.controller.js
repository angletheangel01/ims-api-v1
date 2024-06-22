const { SuccessResponse, CreatedResponse } = require("../../core/success.response")
const resourceService = require("../../service/rbac/resource.service")

class resourceController{
    addResource=async(req,res,next)=>{
        new CreatedResponse({
            message:`Create resource success`,
            metadata: await resourceService.newResource(req.body)
        }).send(res)
    }
    listResources=async(req,res,next)=>{
        new SuccessResponse({
            message:`List resources success`,
            metadata:await resourceService.listResources() 
        }).send(res)
    }
}
module.exports=new resourceController()