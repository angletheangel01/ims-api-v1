`use strict`
const winston=require(`winston`)
require(`winston-daily-rotate-file`)
require(`morgan`)
class Logger{
    constructor(){
        const formatPrint=winston.format.printf(
            ({level,message,context,requestId,timestamp,metadata})=>{
            return `${timestamp}::${level}::${context}::${requestId}::${message}::${JSON.stringify(metadata)}`
            }
        )
        this.logger=winston.createLogger({
            format:winston.format.combine(
                winston.format.timestamp({format:`YYYY-MM-DD HH:mm:ss`}),
                formatPrint
            ),
            transports:[
                new winston.transports.Console(),
                new winston.transports.DailyRotateFile({
                    filename:`application-%DATE%.info.log`,
                    dirname:`src/logs`,
                    datePattern:`YYYY-MM-DD-HH-mm`,
                    zippedArchive:true,
                    maxSize:`20m`,
                    maxFiles:`14d`,
                    format:winston.format.combine(
                        winston.format.timestamp({format:`YYYY-MM-DD HH-mm-ss`}),
                        formatPrint
                    ),
                    level:`info`
                }),
                new winston.transports.Console(),
                new winston.transports.DailyRotateFile({
                    filename:`application-%DATE%.error.log`,
                    dirname:`src/logs`,
                    datePattern:`YYYY-MM-DD-HH-mm`,
                    zippedArchive:true,
                    maxSize:`20m`,
                    maxFiles:`14d`,
                    format:winston.format.combine(
                        winston.format.timestamp({format:`YYYY-MM-DD HH-mm-ss`}),
                        formatPrint
                    ),
                    level:`error`
                })
            ]
        })
    }
    log(message,params){
        const paramLog=this.commonParams(params)
        const logObject=Object.assign({
            message
        },paramLog)
        this.logger.info(logObject)
    }
    error(message,params){
        const paramLog=this.commonParams(params)
        const logObject=Object.assign({
            message
        },paramLog)
        this.logger.error(logObject)
    }
    commonParams(params){
        let context,req,metadata
        if(!Array.isArray(params)){
            context=params
        }else{
            [context,req,metadata]=params
        }
        const requestId=req?.requestId || `unknow`
        return{
            context,
            requestId,
            metadata
        }
    }

}
const logger=new Logger()
module.exports=new Logger()