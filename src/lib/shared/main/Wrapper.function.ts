import { Request, Response } from 'express'
export function Execute(controller:any,method:string){
    return (req:Request,res: Response) => controller[method].call(controller,req,res);
}