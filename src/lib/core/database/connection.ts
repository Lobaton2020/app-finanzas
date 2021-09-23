import IEnviroment from "../../../api/config/env.config";
import databaseConfig from "../../../api/config/database.config";
import { Connection, ConnectionOptions, createConnection } from "typeorm";

export const getConnection = (env:IEnviroment,entities:any[])=>{
    let connection:Connection;
    return async ()=>{
        if(!connection){
            connection = await createConnection(databaseConfig(env) as ConnectionOptions);
        }
    return connection;
    }
}
