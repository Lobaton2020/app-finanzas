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

    error(message:string,data:any = ""){
        console.info(`${getDateTime()} [ERROR][${message} ${objectToString(data)}]`)
    }
    debug(message:string,data:any){
        if(this.canShowDebug){
            console.info(`${getDateTime()} [DEBUG][${message} -- ${objectToString(data)}]`)
        }
    }

}