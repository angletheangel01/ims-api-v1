const { SuccessResponse } = require("../core/success.response")
const apiKeyService = require("../service/apiKey.service")

class apiKeyController{
    createApiKey=async(req,res,next)=>{
        new SuccessResponse({
            message:`Create API key success`,
            metadata:await apiKeyService.createApiKey(req.body)
        }).send(res)
    }
}
module.exports=new apiKeyController()