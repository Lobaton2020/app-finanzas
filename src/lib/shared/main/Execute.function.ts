import { Request, Response } from 'express'
import { InternalException } from '../exceptions/InternalExcepction'
import { IController } from './Controller.class'
export function Execute(controller:IController,method:string){
    return async (req:Request,res: Response) =>{
        try{
            const response:any = await controller[method].call(controller,req,res)
            if(typeof(response) == "object"){
                return res.json(response)
            }
            if(!res.writableEnded){
                controller.logger.error("Respondé esa vaina ome!")
                throw new InternalException()
            }
        }catch(error){
            controller.logger.error(`${error}`,"From 'Execute' method")
            controller.catchError(error, res)
        }
    }
}