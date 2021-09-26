export interface ICreateTraceability{
    requestId:string
    clientIp:string,
    agent:any,
    endpoint:string;
    httpMethod:string;
    userId:number | null;
}