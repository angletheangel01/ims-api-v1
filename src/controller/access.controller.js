const { SuccessResponse, CreatedResponse } = require("../core/success.response")
const accessService = require("../service/access.service")
class accessController{
    addUser=async(req,res,next)=>{
        new CreatedResponse({
            message:"Add user success",
            metadata: await accessService.signUp(req.body)
        }).send(res)
    }
    login=async(req,res,next)=>{
        new SuccessResponse({
            message:`Login success`,
            metadata: await accessService.login(req.body)
        }).send(res)
    }
}
module.exports=new accessController()