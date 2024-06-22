const mongoose=require(`mongoose`)
const COLLECTION_NAME=`Resources`
const DOCUMENT_NAME=`Resource`

const resourceSchema=new mongoose.Schema({
    resource_name:{type:String,required:true},
    resource_slug:{type:String,required:true},
    resource_description:{type:String,default:""}
},{
    timestamps:true,
    collection:COLLECTION_NAME
})
module.exports=mongoose.model(DOCUMENT_NAME,resourceSchema,COLLECTION_NAME)
