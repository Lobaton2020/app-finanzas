import 'reflect-metadata'
require("dotenv").config()
import { Init } from './lib/core/init'
async function bootstrap(){
    try{
        const init = new Init();
        await init.start();
    }catch(error){
        console.error("[ERROR-INIT-APP]",error)
    }
}

bootstrap()
.then(()=>console.log("Init complete"))
.catch((err)=>console.error("[UNKNOWN-ERROR]",err))