import 'reflect-metadata'
import databaseConfig from './api/config/database.config';
require("dotenv").config()
import { Init } from './lib/core/init'

/**
 * @description
 * 1. We must to run the firt the build for take the migration and others to run the app
 * 2. I don't know
*/
async function bootstrap(){
    try{
        const init = new Init();
        init.writeFileTypeOrm(databaseConfig(init.env))
        await init.start();
    }catch(error){
        console.error("[ERROR-INIT-APP]",error)
    }
}

bootstrap()
.then(()=>console.log("Init complete"))
.catch((err)=>console.error("[UNKNOWN-ERROR]",err))