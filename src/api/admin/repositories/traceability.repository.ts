import { Main } from "../../../lib/core/main/Main";
import Logger from "../../../lib/shared/logger/Logger";

import { getRepository, Repository } from "typeorm";
import { IPagination } from "../../config/app.config";
import { Traceability } from "../entities/Traceability.entity";
import { ICreateTraceability } from "../interfaces/create-treaceabilitry.interface";
import { User } from "../../../api/users/entities/User.entity";
import { ValidateException } from "../../../lib/shared/exceptions/ValidateException";
import { Code } from "../../../lib/shared/enums/response/code";

export class TraceabilityRepository{

    private Traceability:Repository<Traceability>;
    private User:Repository<User>;
    private logger:Logger;
    constructor(private main:Main){
        this.Traceability = getRepository(Traceability)
        this.User = getRepository(User)
        this.logger = this.main.logger;
    }

    async find(pag:IPagination){
        this.logger.info("Se consultan datos desde el repositorio de Traceability")
        return await this.Traceability.find(pag);
    }

    async create(trace:ICreateTraceability){
        const user = await this.User.findOne({ id:trace.userId }) || null;
        try{
            const dataIn = this.Traceability.create(trace)
            dataIn.user = user;
            this.logger.info("Se crear registro de seguimiento servicio")
            return await this.Traceability.save(dataIn);
        }catch(error){
            this.logger.error(error,"Creacion de registro de seguimiento de peticion errada")
            throw new ValidateException(Code.BAD_REQUEST,"Failed to add traceaility register")
        }
    }
}