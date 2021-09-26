import { NextFunction, Request, Response } from "express"
import Logger from "../../../shared/logger/Logger"

export const globalError =  (logger:Logger,isDebug:boolean)=>{
    return (err:any,req:Request,res:Response,next:NextFunction)=>{
        logger.error(err,"[MIDDLEWARE|GLOBAL-ERROR] Something went wrong")
        err ||= {}
        return res.json({
            code:err.code ,
            type:err.type ,
            message: err.message,
            errors: isDebug ? err.errors || [] : [],
        })
    }
}