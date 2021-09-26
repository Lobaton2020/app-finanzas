import Logger from "src/lib/shared/logger/Logger";
import { ClassValidator } from "src/lib/shared/validator/ClassValidator.validate";

export default interface IEnviroment{
    PORT:number,
    MONGO_URI:string,
    DATABASE_NAME:string,
    NODE_ENV:string,
    TRACING_LEVEL:string,
    PREFIX_API:string,
    SECRET_KEY:string,
    SECRET_KEY_REFRESH:string,
    //database
    DB_HOST:string;
    DB_PORT:number;
    DB_USER:string;
    DB_PASSWORD:string;
    DB_TYPE:string;
}

export const {
    PORT = 3000,
    MONGO_URI,
    DATABASE_NAME,
    NODE_ENV = "dev",
    TRACING_LEVEL = "DEBUG",
    PREFIX_API,
    SECRET_KEY,
    SECRET_KEY_REFRESH,

    DB_HOST,
    DB_PORT = 3306,
    DB_USER,
    DB_PASSWORD,
    DB_TYPE = "mysql"
} = process.env;


