`use strict`
const AccessControl = require("accesscontrol")
const { FORBIDDEN, BAD_REQUEST } = require("../../core/error.response")
const userModel = require("../../model/user.model")
const roleService = require("../../service/rbac/role.service")
const rbac=new AccessControl()
const HEADER={
    CLIENT_ID:`x-client-id`
}
const grantAccess=(resource,action)=>{
    return async(req,res,next)=>{
        try{
           const userId=req.headers[HEADER.CLIENT_ID]?.toString()
            
           if(!userId){
               throw new FORBIDDEN(`Input user Id`)
           }
           const foundUser=await userModel.findById(userId)
           if(!foundUser){
               throw new BAD_REQUEST(`User no found`)
           }

           rbac.setGrants(await roleService.findRolesByUser({userId}))
           console.log(foundUser.user_roles)
           for (const role of foundUser.user_roles) {
               console.log(role)
               const permission=rbac.can(role)[action](resource)
               if(permission.granted) {
                   return next()
               }
            }
            throw new BAD_REQUEST(`You don't have enough permission to call API`)
        
        }catch(error){
            next(error)
        }
    }
}
module.exports={grantAccess}