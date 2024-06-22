const { BAD_REQUEST } = require("../core/error.response")
const roleModel = require("../model/role.model")
const userModel = require("../model/user.model")
const bcrypt =require(`bcrypt`)
const { getInfoData } = require("../utils")
const HASH_ROUND=10
class accessService{
   static signUp=async({
        username,
        password,
        email,
        phone_number,
        first_name,
        last_name,
        profile_picture,
        roles=[],
        status
    })=>{
        const foundUserName=await userModel.findOne({user_name:username})
        if(foundUserName){
            throw new BAD_REQUEST(`User name already registered.`)
        }
        const foundUserEmail=await userModel.findOne({user_email:email})
        if(foundUserEmail){
            throw new BAD_REQUEST(`Email already registered.`)
        }
        for(let i=0;i<roles.length;i++){
            const foundRole=await roleModel.findOne({role_name:roles[i].toUpperCase()})
            if(!foundRole){
                throw new BAD_REQUEST(`Role no found: ${roles[i]}`)
            }
        }
        const hashedPassword=await bcrypt.hash(password,HASH_ROUND)
        const newUser=await userModel.create({
           user_name:username,
           user_password:hashedPassword,
           user_email:email,
           user_phone_number:phone_number,
           user_first_name:first_name,
           user_last_name:last_name,
           user_profile_picture:profile_picture,
           user_roles:roles,
           user_status:status,
           user_last_login:Date.now()
       })
       if(!newUser){
            throw new BAD_REQUEST(`Something when wrong while create user`)
       }
        return newUser
    }
    static login=async({username,password})=>{
        const foundUser=await userModel.findOne({user_name:username})
        if(!foundUser){
            throw new BAD_REQUEST(`Username or password invalid`)
        }
        const passwordCheck=await bcrypt.compare(password,foundUser.user_password)
        if(!passwordCheck){
            throw new BAD_REQUEST(`Username or password invalid`)
        }
        return {
            user: getInfoData({field:[
            "user_name",
            "user_email",
            "user_phone_number",
            "user_first_name",
            "user_last_name",
            "user_profile_picture",
            "user_roles",
            "user_status",
            "user_last_login"],object:foundUser})
        }
    }
}
module.exports=accessService