const { CreatedResponse, SuccessResponse } = require("../../core/success.response")
const roleService = require("../../service/rbac/role.service")

class roleController{
    addRole=async(req,res,next)=>{
        new CreatedResponse({
            message:"Create role success",
            metadata: await roleService.newRole(req.body)
        }).send(res)
    }
    listRoles=async(req,res,next)=>{
        new SuccessResponse({
            message:"List roles success",
            metadata:await roleService.listRoles()
        }).send(res)
    }
    addGrants=async(req,res,next)=>{
        new SuccessResponse({
            message:`Add Grants Success`,
            metadata:await roleService.addGrants(req.body)
        }).send(res)
    }
    listRolesByUserId=async(req,res,next)=>{
        new SuccessResponse({
            message:`List role by user id success`,
            metadata:await roleService.findRolesByUser(req.body)
        }).send(res)
    }
    addActions=async(req,res,next)=>{
        new SuccessResponse({
            message:`Add actions to resource success`,
            metadata: await roleService.addActions(req.body)
        }).send(res)
    }
}
module.exports=new roleController()