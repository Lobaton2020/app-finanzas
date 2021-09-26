import { Response } from 'express'
import { InternalException } from '../exceptions/InternalExcepction';
import Logger from '../logger/Logger';


export interface IController{
    logger:Logger;
    catchError(err:any,res:Response);
}

export class Controller implements IController{

    constructor(public readonly logger:Logger){}

    catchError(err:any,res:Response){
        this.logger.error(err, "[Controller|catchError] Something went wrong")
        err = err || {}
        let { code, message, type, errors } = err;
        if(!code || !message || !type || !errors){
            return res.status(code || 200).json(new InternalException())
        }
        return res.status(code || 200).json({ code, type, message, errors })
    }
}