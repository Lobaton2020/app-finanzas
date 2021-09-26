import { DatabaseException } from "../../../lib/shared/exceptions/DatabaseException";
import { Main } from "../../../lib/core/main/Main";
import Logger from "../../../lib/shared/logger/Logger";
import { ValidateException } from "../../../lib/shared/exceptions/ValidateException";

import { getRepository, Repository } from "typeorm";
import { IPagination } from "../../config/app.config";
import { Code } from "../../../lib/shared/enums/response/code";
import { User } from "../../users/entities/User.entity";
import { InflowType } from "../entities/IntflowType.entity";
import { InflowTypeCreateDto,  } from "../dtos/inflow-type.dto";

export class InflowTypeRepository{

    private User:Repository<User>;
    private InflowType:Repository<InflowType>;
    private logger:Logger;

    constructor(private main:Main){
        this.User = getRepository(User)
        this.InflowType = getRepository(InflowType)
        this.logger = this.main.logger;
    }

    async find(pag:IPagination){
        this.logger.info("Se consultan datos desde el repositorio de inflow type")
        return await this.InflowType.find(pag);
    }

    async create(inflowType:InflowTypeCreateDto){

        const user =  await this.User.findOne({ id: inflowType.userId });
        if(!user){
            throw new ValidateException(Code.BAD_REQUEST,"The user not exists")
        }

        if(await this.InflowType.findOne({ name:inflowType.name })){
            throw new ValidateException(Code.BAD_REQUEST,"The Inflow Type already exists")
        }

        try{
            const dataSave = this.InflowType.create(inflowType)
            dataSave.user = user
            this.logger.info("Se crear registro repositorio de tipo de entrada")
            const newData = await this.InflowType.save(dataSave);
            delete newData.user;
            return newData;
        }catch(error){
            this.logger.error(error)
            throw new DatabaseException(Code.ERROR_INTERNAL,"Failed in database process")
        }
    }
}