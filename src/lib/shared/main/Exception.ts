export abstract class Exception extends Error{
    constructor(
        public readonly code:number,
        public readonly message:string,
        public readonly errors:any = [],
        public readonly type:string = "error"

    ){
        super(message);
    }
}