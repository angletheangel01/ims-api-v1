const { ReasonPhrases, StatusCodes } = require("../utils/httpStatusCode")
const Logger=require(`../middleware/log/logger.middleware`)
require(`../utils/httpStatusCode`)
class ErrorResponse extends Error{
    constructor(message,status){
        super(message)
        this.status=status
        Logger.error(this.message,{
            context:`/path`,    
            requestId:`UUUUAAA`,
            message:this.message,
            metadata:{}
        })
    }
}
class NOT_FOUND extends ErrorResponse{
    constructor(message=ReasonPhrases.NOT_FOUND,status=StatusCodes.NOT_FOUND){
        super(message,status)
    }
}
class FORBIDDEN extends ErrorResponse{
    constructor(message=ReasonPhrases.FORBIDDEN,status=StatusCodes.FORBIDDEN){
        super(message,status)
    }
}
class BAD_REQUEST extends ErrorResponse{
    constructor(message=ReasonPhrases.BAD_REQUEST,status=StatusCodes.BAD_REQUEST){
        super(message,status)
    }
}
class CONFLICT extends ErrorResponse{
    constructor(message=ReasonPhrases.CONFLICT,status=StatusCodes.CONFLICT){
        super(message,status)
    }
}
class UNAUTHORIZED extends ErrorResponse{
    constructor(message=ReasonPhrases.UNAUTHORIZED,status=StatusCodes.CONFLICT){
        super(message,status)
    }
}
module.exports={NOT_FOUND,FORBIDDEN,BAD_REQUEST,CONFLICT,UNAUTHORIZED}
