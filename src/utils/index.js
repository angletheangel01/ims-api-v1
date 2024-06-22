const { default: mongoose } = require("mongoose")
const _=require(`lodash`)
const getInfoData=({field=[],object={}})=>{
    return _.pick(object,field)
}
const asyncHandler=fn=>{
    return(req,res,next)=>{
        fn(req,res,next).catch(next)
    }
}
const convertToObjectIdMongoDB=(id)=>new mongoose.Types.ObjectId(id)
const promisesHandler=(promises)=>{
    return Promise.allSettled(promises)
}
const processPromises=async(promises)=>{
    const results=await promisesHandler(promises)
    const resolveResults=results
    .filter(result=>result.status==="fulfilled")
    .map(result=>result.value)
    const rejectResults=results
    .filter(result=>result.status==="rejected")
    .map(result=>result.reason)
    return {resolveResults,rejectResults}
}
module.exports={
    asyncHandler,
    convertToObjectIdMongoDB,
    getInfoData,
    processPromises
}