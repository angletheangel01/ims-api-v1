const { ReasonPhrases, StatusCodes } = require("../utils/httpStatusCode");
class SuccessResponse {
    constructor({message,status=StatusCodes.OK,reasonStatus=ReasonPhrases.OK,metadata={}}) {
        this.message = !message ? reasonStatus: message
        this.status = status
        this.metadata = metadata
    }
    send(res,header={}){
        return res.status(this.status).json(this)
    }
}
class CreatedResponse extends SuccessResponse {
    constructor({message,status=StatusCodes.CREATED,reasonStatus=ReasonPhrases.CREATED,metadata={}}) {
        super(message,status,reasonStatus,metadata)
        this.status=status
        this.message=reasonStatus
        this.metadata=metadata
    }
}

module.exports = {
    SuccessResponse,
    CreatedResponse
}
