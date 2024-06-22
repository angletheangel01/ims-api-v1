const mongoose=require(`mongoose`)
const COLLECTION_NAME=`Skus`
const DOCUMENT_NAME=`Sku`
const skuSchema = new mongoose.Schema({
    sku_id:{type:String,required:true,unique:true},
    sku_tier_idx:{type:Array,default:[0]},
    sku_default:{type:Boolean,default:false},
    sku_price:{type:String,required:true},
    sku_stock:{type:Number,required:true},
    spu_id:{type:String,required:true}
},{
    timestamps:true,
    collection:COLLECTION_NAME
})

module.exports=mongoose.model(DOCUMENT_NAME,skuSchema,COLLECTION_NAME)