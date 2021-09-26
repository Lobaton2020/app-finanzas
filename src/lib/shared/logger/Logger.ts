import { getDateTime, objectToString } from "../helpers/logger-helper"

export default class Logger{

    constructor(
        private canShowDebug:boolean = true
    ){}
    info(message:string){
        console.info(`${getDateTime()} [INFO][${message}]`)
    }

    warn(message:string){
        console.warn(`${getDateTime()} [WARNING][${message}]`)
    }

    error(error:any,message:string = "Failed"){
        console.info(`${getDateTime()} [ERROR][${message}]`,error)
    }
    debug(data:any,message:string= "Data"){
        if(this.canShowDebug){
            console.info(`${getDateTime()} [DEBUG][${message} -- ${objectToString(data)}]`)
        }
    }

}