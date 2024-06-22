const express=require(`express`)
const { asyncHandler } = require("../../utils")
const apiKeyController = require("../../controller/apiKey.controller")
const router=express.Router()
router.post(`/create`,asyncHandler(apiKeyController.createApiKey))
module.exports=router
