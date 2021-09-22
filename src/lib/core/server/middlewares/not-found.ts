import { Request, Response } from "express"

export const notFound =  (req:Request,res:Response)=>{
    return res.json({
        message: `Route ${req.baseUrl} not found`,
        type: "error"
    })
}