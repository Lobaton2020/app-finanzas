import { DatabaseException } from "../../../lib/shared/exceptions/DatabaseException";
import { Main } from "../../../lib/core/main/Main";
import Logger from "../../../lib/shared/logger/Logger";
import { ValidateException } from "../../../lib/shared/exceptions/ValidateException";

import { getRepository, Repository } from "typeorm";
import { IPagination } from "../../config/app.config";
import { Code } from "../../../lib/shared/enums/response/code";
import { User } from "../../users/entities/User.entity";
import { OutflowType } from "../entities/OutflowType.entity";
import { OutflowTypeCreateDto } from "../dtos/outflow-type.dto";

export class OutflowTypeRepository{

    private User:Repository<User>;
    private OutflowType:Repository<OutflowType>;
    private logger:Logger;

    constructor(private main:Main){
        this.User = getRepository(User)
        this.OutflowType = getRepository(OutflowType)
        this.logger = this.main.logger;
    }

    async find(pag:IPagination){
        this.logger.info("Se consultan datos desde el repositorio de outflow type")
        return await this.OutflowType.find(pag);
    }

    async create(outflowType:OutflowTypeCreateDto){

        const user =  await this.User.findOne({ id: outflowType.userId });
        if(!user){
            throw new ValidateException(Code.BAD_REQUEST,"The user not exists")
        }

        if(await this.OutflowType.findOne({ name:outflowType.name })){
            throw new ValidateException(Code.BAD_REQUEST,"The Outflow Type already exists")
        }

        try{
            const dataSave = this.OutflowType.create(outflowType)
            dataSave.user = user
            this.logger.info("Se crear registro repositorio de tipo de salida")
            const newData = await this.OutflowType.save(dataSave);
            delete newData.user;
            return newData;
        }catch(error){
            this.logger.error(error)
            throw new DatabaseException(Code.ERROR_INTERNAL,"Failed in database process")
        }
    }
}