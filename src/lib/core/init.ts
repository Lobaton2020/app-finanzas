import registerRoutes from "../../api/registerRoutes";
import { User } from "../../api/users/entities/User.entity";
import Logger from "../shared/logger/Logger";
import { Validator } from "../shared/validator/Validator";
import IEnviroment, * as ENV from "./.././../api/config/env.config"
import { getConnection } from "./database/connection";
import { Main } from "./main/Main";
import ExpressApp from "./server/express";
import fs from "fs"
import path from "path"
export class Init{
    private logger:Logger;
    private isDebug:boolean;
    private express:ExpressApp;
    public env:IEnviroment = ENV as IEnviroment;

    constructor(){
        this.isDebug = ENV.TRACING_LEVEL === "DEBUG";
        this.logger = new Logger(this.isDebug)
        this.express = new ExpressApp(this.logger, this.env, this.isDebug);
        this.logger.debug("Variables de entorno",this.env)
    }
    async start(){
        const entities = [
            User
        ];
        const main = new Main(
            this.logger,
            this.express.router,
            new Validator(this.logger),
            await getConnection(this.env,entities)()
        );
        registerRoutes(main)
        this.express.init()
        this.express.middlewares()
        await this.express.start()
    }

    writeFileTypeOrm(env:any){
        fs.writeFileSync(path.resolve(__dirname,"../../../ormconfig.json"),JSON.stringify(env,null,4))
    }

}