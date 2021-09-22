import registerRoutes from "../../api/registerRoutes";
import { User } from "../../api/users/entities/User";
import Logger from "../shared/logger/Logger";
import { Validator } from "../shared/validator/Validator";
import IEnviroment, * as ENV from "./.././../api/config/env.config"
import { getConnection } from "./database/connection";
import { Main } from "./main/Main";
import ExpressApp from "./server/express";

export class Init{
    private logger:Logger;
    private isDebug:boolean;
    private express:ExpressApp;
    private env:IEnviroment = ENV as IEnviroment;

    constructor(){
        this.isDebug = ENV.OUTPUT_TYPE === "DEBUG";
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
    //database
}