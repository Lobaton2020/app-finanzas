import { validate } from "class-validator";
import { CLASS_VALIDATOR } from "../../../api/config/app.config";
import { ValidateException } from "../exceptions/ValidateException";
import Logger from "../logger/Logger";

export class ClassValidator{
    constructor(
        private logger: Logger
    ){}
    getMessages = (errors:any[],isLogger:boolean=false)=>{
        return errors.map(({ constraints })=>{
                return Object.entries(constraints).map(([ type, message ])=>isLogger ? `${message} : ${type}`: message)
        })
    }

    validate = async (object:any,body:any):Promise<any | boolean>=>{
    const validator = Object.assign(new object(),body);
    const result:any[] = await validate(validator,CLASS_VALIDATOR)
    if(result.length > 0){
        this.logger.error(this.getMessages(result,true), "Error en validacion class-validator")
        throw new ValidateException(400, "Error en validacion de datos", this.getMessages(result))
    }
    return validator;
}
}