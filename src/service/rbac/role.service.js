const { default: mongoose } = require("mongoose")
const { BAD_REQUEST, CONFLICT } = require("../../core/error.response")
const { findResourceById } = require("../../model/repository/resource.repo")
const resourceModel = require("../../model/resource.model")
const roleModel = require("../../model/role.model")
const userModel = require("../../model/user.model")
const { convertToObjectIdMongoDB, processPromises } = require("../../utils")

class roleService{
    static newRole=async({name,slug,status,description,grants})=>{
        const foundRole=await roleModel.findOne({
            role_name:name.toUpperCase(),
            role_slug:slug.toUpperCase()
        })
        if(foundRole){
            throw new CONFLICT("Role already exist") //409
        }
        const resource_validate=grants.map(grant=>{
            return new Promise((resolve,reject)=>{
                resourceModel.findById(convertToObjectIdMongoDB(grant.resource))
                .then(resource=>{
                        resolve(resource)
                })  
                .catch((error)=>{
                    reject(error)
                })
            }) 
        })
        var newRole
        await Promise.all(resource_validate).then(async()=>{
            newRole=await roleModel.create({
                role_name:name.toUpperCase(),
                role_slug:slug.toUpperCase(),
                role_status:status,
                role_description:description,
                role_grants:grants
            })
        if(newRole){
            return newRole 
        }else throw new BAD_REQUEST("Couldn't create new role")
        }).catch(()=>{
            throw new BAD_REQUEST(`Resource Error`)
        })
       return newRole
    }
    static listRoles=async()=>{
        const listOfRoles= await roleModel.aggregate([
            {
                $unwind:"$role_grants"
            },{
                $lookup:{
                    from:"Resources",
                    localField:"role_grants.resource",
                    foreignField:"_id",
                    as:"resource"
                }
            },{
                $unwind:"$resource"
            },{
                $project:{
                    _id:0,
                    role:`$role_name`,
                    resource:`$resource.resource_name`,
                    action:`$role_grants.actions`,
                    attribute:`$role_grants.attributes`
                }
            },{
                $unwind:`$action`
            }

        ])
        return listOfRoles
    }
    static addGrants=async({name,slug,grants=[]})=>{
        name=name.toUpperCase()
        slug=slug.toUpperCase()
        const foundRole=await roleModel.findOne({
            role_name:name,
            role_slug:slug
        })
        if(!foundRole){
            throw new BAD_REQUEST(`Role don't exist`)
        }
        const grants_promises=grants.map(grant=>{
            return new Promise(async(resolve,reject)=>{
                if(!mongoose.Types.ObjectId.isValid(grant.resource)){
                    return reject(`Invalid resource ID: ${grant.resource}`)
                }
                const foundResource=await resourceModel.findById(grant.resource)
                if(!foundResource){
                    return reject(`Resource no found: ${grant.resource}`)
                }else{
                    const exists=foundRole.role_grants.some(item=>item.resource==grant.resource)
                    if(exists){
                        return reject(`Resource Already exists: ${grant.resource}`)
                    }else resolve(grant)
                }
            })
        })
        const{resolveResults,rejectResults}=await processPromises(grants_promises)
        const result=await roleModel.findOneAndUpdate({
            role_name:name,
            role_slug:slug
        },{
            $addToSet:{role_grants:{$each:resolveResults}}
        },{new:true})
        return {
            resolve:resolveResults,
            reject:rejectResults
        }
    }
    static findRolesByUser=async({userId})=>{
        const convertedUserId=convertToObjectIdMongoDB(userId)
        const result= await userModel.aggregate([{ $match: { _id: convertedUserId } },
            { $project: { _id: 0, roles: `$user_roles` } },
             { $lookup: { from: "Roles", localField: "roles", foreignField: "role_name", as: "grants" } },
              { $project: { roles: 0 } },
               { $unwind: "$grants" }, { $unwind: "$grants.role_grants" },
               { $lookup: { from: "Resources", localField: "grants.role_grants.resource", foreignField: "_id", as: "resource" } },
                { $unwind: "$resource" },
                 { $project: {role:"$grants.role_name",resource_name: "$resource.resource_name", actions: "$grants.role_grants.actions", attributes: "$grants.role_grants.attributes" } },
                 { $group:{ _id:"$resource_name", actions:{$first:"$actions"}, attributes:{$first:"$attributes"},role:{$first:"$role"}}},
                 { $project:{ _id:0,role:"$role", resource:"$_id", action: "$actions", attributes:"$attributes"}},
                 {$unwind:"$action"}
       ])
       return result
    }
    static addActions=async({roleId,resourceId,actions=[]})=>{
        const foundRole=await roleModel.findById(roleId)
        if(!foundRole){
            throw new BAD_REQUEST(`Role no found`)
        }
        const result=await roleModel.findOneAndUpdate({
            _id:convertToObjectIdMongoDB(roleId),
            'role_grants.resource':resourceId
        },{$set:{'role_grants.$.actions':actions}},{
            new:true
        })
        if(!result){
            throw new BAD_REQUEST(`Resource no found`)
        }
        return result
    }
}
module.exports=roleService