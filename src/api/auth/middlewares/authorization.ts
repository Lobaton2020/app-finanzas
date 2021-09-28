import { NextFunction, Request, Response } from "express"
import { Code } from "../../../lib/shared/enums/response/code"
import { Message } from "../../../lib/shared/enums/response/message"
import { ValidateException } from "../../../lib/shared/exceptions/ValidateException"
import { Main } from "../../../lib/core/main/Main";
import Logger from "../../../lib/shared/logger/Logger"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid'
import useragent from 'express-useragent'
import { RolAccess } from "./rol"
import { UserRepository } from "../../../api/users/repositories/user.repository"
import { SECRET_KEY } from "../../../api/config/env.config";
import { User } from "../../../api/users/entities/User.entity"
import { TraceabilityRepository } from "../../../api/admin/repositories/traceability.repository";
import { ICreateTraceability } from "src/api/admin/interfaces/create-treaceabilitry.interface";


export const registerTraceability = async (req:Request,res:Response,main:Main) =>{
    const traceRepository = new TraceabilityRepository(main)
    const requestId = uuidv4();
    const clientIp = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress as string;
    const agent = useragent.parse(req.headers['user-agent'])
    res.setHeader("app-finanzas-id-request",requestId);
    const payload:ICreateTraceability = {
        requestId,
        clientIp,
        agent,
        endpoint:req.originalUrl,
        httpMethod:req.method,
        userId: req["user"]?.id || null
    }
    return await traceRepository.create(payload)
}

export const NonAuthorization = (main:Main) =>{
    return (req:Request,res:Response,next:NextFunction)=>{
        registerTraceability(req,res,main)
        .catch((error)=>{
            const logger = new Logger();
            logger.error(error,"Fallo traceability register")
        })
        next();
    }
}
const makeTraceability = (req:Request, res: Response,main:Main)=>{
    registerTraceability(req,res,main)
    .catch((error)=>{
        const logger = new Logger();
        logger.error(error,"Fallo traceability register")
    })
}
export const authorization = (types:RolAccess[],main:Main)=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        const logger = new Logger();
        try{
             const token = req.headers["authorization"]?.split(" ")[1];
             const payload:any  = jwt.verify(token,SECRET_KEY);
             const timeNow = new Date().getTime() / 1000 | 0;
             if(payload.exp < timeNow ){
                makeTraceability(req,res,main)
                throw new Error("The token is expired");
             }
             const userRepository = new UserRepository(main)
             const user:User = await userRepository.findOneById(payload.sub)
             if(!user){
                makeTraceability(req,res,main)
                throw new Error("The user not found");
             }
             //If the rol of the user is not exist, generate a error
             if(!types.includes(user.rol.name as RolAccess)){
                makeTraceability(req,res,main)
                throw new Error("The rol of the user haven't access");
             }
             req["user"] = user;
             makeTraceability(req,res,main)
             next()
        }catch(error){
            makeTraceability(req,res,main)
            logger.error(`${error}`,"Fallo en obtencion del token");
            const newError = new ValidateException(Code.UNAUTHORIZED, Message.UNAUTHORIZED, [error?.message || "Autorizacion invalida"]);
            next(newError)
        }
    }
}

