import registerRoutes from "../../api/registerRoutes";
import Logger from "../shared/logger/Logger";
import { Validator } from "../shared/validator/Validator";
import IEnviroment, * as ENV from "./.././../api/config/env.config"
import { getConnection } from "./database/connection";
import { Main } from "./main/Main";
import ExpressApp from "./server/express";
import fs from "fs"
import path from "path"
import { ClassValidator } from "../shared/validator/ClassValidator.validate";
import { Enviroments } from "../../api/config/env.validate";
export class Init{
    private logger:Logger;
    private isDebug:boolean;
    private express:ExpressApp;
    public env:IEnviroment = ENV as IEnviroment;

    constructor(){
        this.isDebug = ENV.TRACING_LEVEL === "DEBUG";
        this.logger = new Logger(this.isDebug)
        this.express = new ExpressApp(this.logger, this.env, this.isDebug);
        this.logger.debug(this.env,"Variables de entorno")
    }
    async start(){
        const main = new Main(
            this.logger,
            this.express.router,
            new Validator(this.logger),
            await getConnection(this.env)()
        );
        registerRoutes(main)
        this.express.init()
        this.express.middlewares()
        await this.validateEnvironmentsVariables()
        await this.express.start()
    }
    async validateEnvironmentsVariables():Promise<void>{
        const classValidator = new ClassValidator(this.logger);
        await classValidator.validate(Enviroments,this.env)

    }
    writeFileTypeOrm(env:any){
        fs.writeFileSync(path.resolve(__dirname,"../../../ormconfig.json"),JSON.stringify(env,null,4))
    }

}