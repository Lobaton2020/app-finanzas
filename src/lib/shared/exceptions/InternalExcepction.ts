import { Code } from "../enums/response/code";
import { Message } from "../enums/response/message";
import { Exception } from "../main/Exception";

export class InternalException extends Exception{
    constructor(
        public readonly code:number = Code.ERROR_INTERNAL,
        public readonly message:string = Message.ERROR_INTERNAL,
        public readonly errors:any = [],
        public readonly type:string = "error"

    ){
        super(code,message,errors,type);
    }
}