import { NextFunction, Request, Response } from "express"
import { Code } from "../../../lib/shared/enums/response/code"
import { Message } from "../../../lib/shared/enums/response/message"
import { ValidateException } from "../../../lib/shared/exceptions/ValidateException"
import { Main } from "../../../lib/core/main/Main";
import Logger from "../../../lib/shared/logger/Logger"

import { RolAccess } from "./rol"
import jwt from "jsonwebtoken"
import { UserRepository } from "../../../api/users/repositories/user.repository"
import { SECRET_KEY } from "../../../api/config/env.config";
import { User } from "../../../api/users/entities/User.entity"


export const registerTraceability = (req:Request,res:Response,next:NextFunction)=>{
    //add traceability
}
export const authorization = (types:RolAccess[],main:Main)=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        const logger = new Logger();
        try{
             const token = req.headers["authorization"].split(" ")[1];
             const payload:any  = jwt.verify(token,SECRET_KEY);
             const timeNow = new Date().getTime() / 1000 | 0;
             if(payload.exp < timeNow ){
                 throw new Error("The token is expired");
             }
             const userRepository = new UserRepository(main)
             const user:User = await userRepository.findOneById(payload.sub)
             if(!user){
                throw new Error("The user not found");
             }
             //If the rol of the user is not exist, generate a error
             if(!types.includes(user.rol.name as RolAccess)){
                throw new Error("The rol of the user haven't access");
             }
             req["user"] = user;
             next()
        }catch(error){
            logger.error(`${error}`,"Fallo en obtencion del token");
            const newError = new ValidateException(Code.UNAUTHORIZED, Message.UNAUTHORIZED, [error?.message || "Autorizacion invalida"]);
            next(newError)
        }
    }
}

