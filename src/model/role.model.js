const mongoose=require(`mongoose`)
const DOCUMENT_NAME=`Role`
const COLLECTION_NAME=`Roles`

const rolesSchema=new mongoose.Schema({
    role_name:{type:String,required:true,unique:true},
    role_slug:{type:String,required:true,unqiue:true},
    role_status:{type:String,default:`active`,enum:[`active`,`block`,`pending`]},
    role_description:{type:String,default:""},
    role_grants:[
        {
            resource:{type:mongoose.Schema.Types.ObjectId,ref:`Resource`,required:true},
            actions:[{type:String,required:true}],
            attributes:{type:String,required:true}

        }
    ]
},{
    collection:COLLECTION_NAME,
    timestamps:true
})
module.exports=mongoose.model(DOCUMENT_NAME,rolesSchema,COLLECTION_NAME)
