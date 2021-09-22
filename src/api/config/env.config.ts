
export default interface IEnviroment{
    PORT:number,
    MONGO_URI:string,
    DATABASE_NAME:string,
    NODE_ENV:string,
    OUTPUT_TYPE:string,
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
    OUTPUT_TYPE = "DEBUG",
    DB_HOST,
    DB_PORT = 3306,
    DB_USER,
    DB_PASSWORD,
    DB_TYPE = "mysql"
} = process.env;

