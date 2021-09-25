import {  IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class Enviroments {

    @IsNumberString()
    @IsNotEmpty()
    PORT:number;

    @IsString()
    @IsNotEmpty()
    MONGO_URI:string;

    @IsString()
    @IsNotEmpty()
    DATABASE_NAME:string;

    @IsString()
    @IsNotEmpty()
    NODE_ENV:string;

    @IsString()
    @IsNotEmpty()
    TRACING_LEVEL:string;

    @IsString()
    @IsNotEmpty()
    PREFIX_API:string;
    @IsString()
    @IsNotEmpty()
    SECRET_KEY:string;

    //database
    @IsString()
    @IsNotEmpty()
    DB_HOST:string;

    @IsNumberString()
    @IsNotEmpty()
    DB_PORT:number;

    @IsString()
    @IsNotEmpty()
    DB_USER:string;

    @IsString()
    @IsNotEmpty()
    DB_PASSWORD:string;

    @IsString()
    @IsNotEmpty()
    DB_TYPE:string;
}
