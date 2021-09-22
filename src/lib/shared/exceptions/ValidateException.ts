export class ValidateException extends Error{
    constructor(
        public readonly code:string,
        public readonly message:string,
        public readonly type:string,
        public readonly errors:any = []

    ){
        super(message);
    }
}