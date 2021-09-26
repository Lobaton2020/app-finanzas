import express ,{ Router} from "express";
import IEnviroment from "../../../api/config/env.config";
import Logger from "../../shared/logger/Logger";
import { globalError } from "./middlewares/global-error";
import { notFound } from "./middlewares/not-found";

export default class ExpressApp{
    private _app = express();
    private _router = Router();

    constructor(
        private readonly logger:Logger,
        private readonly env:IEnviroment,
        private readonly isDebug:boolean
    ){}

    init(){
        this._app.use(express.json())
    }

    middlewares(){
        this._app.use(this.env.PREFIX_API, this._router)
        this._app.use("*", notFound)
        this._app.use(globalError(this.logger, this.isDebug))
    }

    get router(){
        return this._router;
    }

    start(){
        this._app.listen(this.env.PORT || 3000, () => {
            this.logger.info(`SERVER RUNNING IN PORT: ${this.env.PORT || 3000}`)
        })
    }

}