const mongoose=require(`mongoose`)
const COLLECTION_NAME=`Users`
const DOCUMENT_NAME=`User`

const userSchema=new mongoose.Schema({
    user_name:{type:String,required:true,unique:true},
    user_password:{type:String,required:true},
    user_email:{type:String,required:true},
    user_phone_number:{type:Array,required:true},
    user_first_name:{type:String,required:true},
    user_last_name:{type:String,required:true},
    user_profile_picture:{type:String,required:false},
    user_roles:[{type:String,required:true}],
    user_status:{type:[String],enum:['active','inactive','suspended'],default:`active`},
    user_last_login:{type:Date,required:false}
},{
    timestamps:true,
    collection:COLLECTION_NAME
})
module.exports=mongoose.model(DOCUMENT_NAME,userSchema,COLLECTION_NAME)
