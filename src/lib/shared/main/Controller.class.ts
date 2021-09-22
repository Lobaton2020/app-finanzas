import { Response } from 'express'
import Logger from '../logger/Logger';
export class Controller{

    constructor(protected logger:Logger){}

    catchError(err:any,res:Response){
        this.logger.error("Something went wrong")
        const { code, message, type, errors } = err;
        return res.status(code || 200).json({ code, type, message, errors })
    }
}