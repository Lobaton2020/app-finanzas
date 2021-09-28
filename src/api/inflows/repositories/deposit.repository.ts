import { DatabaseException } from "../../../lib/shared/exceptions/DatabaseException";
import { Main } from "../../../lib/core/main/Main";
import Logger from "../../../lib/shared/logger/Logger";
import { ValidateException } from "../../../lib/shared/exceptions/ValidateException";

import { getRepository, Repository } from "typeorm";
import { IPagination } from "../../config/app.config";
import { Code } from "../../../lib/shared/enums/response/code";
import { User } from "../../users/entities/User.entity";
import { Deposit } from "../entities/Deposit.entity";
import { DepositCreateDto } from "../dtos/deposit.dto";

export class DepositRepository{

    private User:Repository<User>;
    private Deposit:Repository<Deposit>;
    private logger:Logger;

    constructor(private main:Main){
        this.User = getRepository(User)
        this.Deposit = getRepository(Deposit)
        this.logger = this.main.logger;
    }

    async find(pag:IPagination,userId:number){
        this.logger.info("Se consultan datos desde el repositorio de user")
        return await this.Deposit.find({...pag, where:{ user: userId }});
    }

    async create(deposit:DepositCreateDto){

        const user =  await this.User.findOne({ id: deposit.userId });
        if(!user){
            throw new ValidateException(Code.BAD_REQUEST,"The user not exists")
        }

        if(await this.Deposit.findOne({ name:deposit.name })){
            throw new ValidateException(Code.BAD_REQUEST,"The Deposit already exists")
        }

        try{
            const categorySave = this.Deposit.create(deposit)
            categorySave.user = user
            this.logger.info("Se crear registro repositorio de category")
            return await this.Deposit.save(categorySave);
        }catch(error){
            this.logger.error(error)
            throw new DatabaseException(Code.ERROR_INTERNAL,"Failed in database process")
        }
    }
}