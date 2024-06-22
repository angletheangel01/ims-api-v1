const mongoose=require(`mongoose`)
const COLLECTION_NAME="apiKeys"
const DOCUMENT_NAME="apiKey"

const apiKeySchema=new mongoose.Schema({
    key:{type:String,required:true,unique:true},
    userId:[{type: mongoose.Schema.Types.ObjectId,ref:"User",required:true}],
    expiresAt:{type:Date},
    status:{type:String,enum:["active","inactive","revoke"],default:"active"},
    lastUsed:{type:Date,default:Date.now()},
    rateLimit:{type:Number},
},{
    timestamps:true,
    collection:COLLECTION_NAME
})
apiKeySchema.pre('save', function(next) {
    if (this.isNew) {
        this.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    }
    next();
});

module.exports=mongoose.model(DOCUMENT_NAME,apiKeySchema,COLLECTION_NAME)
