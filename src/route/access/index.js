const express=require(`express`)
const { asyncHandler } = require("../../utils")
const accessController = require("../../controller/access.controller")
const { apiKeyCheck } = require("../../authentication/authUtils")
const router=express.Router()
router.post('/signup',asyncHandler(accessController.addUser))
router.get('/login',asyncHandler(accessController.login))
module.exports=router