import { NextFunction, Request, Response } from "express"
import Logger from "../../../shared/logger/Logger"

export const globalError =  (logger:Logger,isDebug:boolean)=>{
    return (err:any,req:Request,res:Response,next:NextFunction)=>{
        logger.error(err)
        logger.error("Something went wrong")
        return res.json({
            code: isDebug ? err.code : "",
            type: isDebug ? err.type : "",
            message: isDebug ?  err.message :"",
            errors: isDebug ? err.error || [] : [],
        })
    }
}