const mongoose=require(`mongoose`)
const COLLECTION_NAME=`Spus`
const DOCUMENT_NAME=`Spu`
const spuSchema = new mongoose.Schema({
    spu_id:{type:String,required:true,unique:true},
    spu_name:{type:String,required:true},
    spu_category:{type:Array,required:true},
    spu_brand:{type:String,required:true},
    spu_description:{type:String,required:true},
    spu_thumbnail:{type:String,required:true},
    spu_attributes:{type:Array,required:true},
    spu_variations:{type:Array,required:false,default:[]}
},{
    timestamps:true,
    collection:COLLECTION_NAME
})

module.exports=mongoose.model(DOCUMENT_NAME,spuSchema,COLLECTION_NAME)
