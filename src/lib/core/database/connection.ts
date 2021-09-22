import { Connection, createConnection } from "typeorm";
import IEnviroment from "../../../api/config/env.config";

export const getConnection = (env:IEnviroment,entities:any[])=>{
    let connection:Connection;
    return async ()=>{
        if(!connection){
            connection = await createConnection({
                type: env.DB_TYPE as any,
                host: env.DB_HOST,
                port: env.DB_PORT,
                username: env.DB_USER,
                password: env.DB_PASSWORD,
                database: env.DATABASE_NAME,
                entities,
                synchronize:true
            });
        }
    return connection;
    }
}
