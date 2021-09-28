import { DatabaseException } from "../../../lib/shared/exceptions/DatabaseException";
import { Main } from "../../../lib/core/main/Main";
import Logger from "../../../lib/shared/logger/Logger";
import { ValidateException } from "../../../lib/shared/exceptions/ValidateException";

import { getRepository, Repository } from "typeorm";
import { IPagination } from "../../config/app.config";
import { Code } from "../../../lib/shared/enums/response/code";
import { User } from "../../users/entities/User.entity";
import { OutflowType } from "../entities/OutflowType.entity";
import { OutflowCreateDto } from "../dtos/outflow-create.dto";
import { Category } from "../entities/Category.entity";
import { Deposit } from "../../../api/inflows/entities/Deposit.entity";
import { Outflow } from "../entities/Outflow.entity";
import { ReportRepository } from "src/api/reports/repositories/report.repository";

export class OutflowRepository{

    private User:Repository<User>;
    private Outflow:Repository<Outflow>;
    private Category:Repository<Category>;
    private Deposit:Repository<Deposit>;
    private OutflowType:Repository<OutflowType>;
    private logger:Logger;

    constructor(
        private main:Main,
        private readonly reportRepository:ReportRepository
        ){
        this.User = getRepository(User)
        this.Outflow = getRepository(Outflow)
        this.OutflowType = getRepository(OutflowType)
        this.Category = getRepository(Category)
        this.Deposit = getRepository(Deposit)
        this.logger = this.main.logger;
    }

    async find(pag:IPagination,userId:number){
        this.logger.info("Se consultan datos desde el repositorio de outflows")
        const opts = {
            ...pag,
            relations:["category","user","deposit","outflowtype"],
            where:{ user:userId }
        };
        return await this.Outflow.find(opts);
    }

    async create(outflow:OutflowCreateDto){

        const { userId, outflowTypeId,categoryId, depositId } = outflow;
        const user = await this.User.findOne(userId);
        if(!user){
            throw new ValidateException(Code.BAD_REQUEST,"The user not exist")
        }
        const outflowType = await this.OutflowType.findOne(outflowTypeId)
        if(!outflowType){
            throw new ValidateException(Code.BAD_REQUEST,"The ouflowType not exist")
        }

        const category = await this.Category.findOne(categoryId);
        if(!category){
            throw new ValidateException(Code.BAD_REQUEST,"The category not exist")
        }

        const deposit = await this.Deposit.findOne(depositId);
        if(!deposit){
            throw new ValidateException(Code.BAD_REQUEST,"The deposit not exist")
        }
        if(!await this.isAmountDisponible(depositId, userId, outflow.amount)){
            throw new ValidateException(Code.BAD_REQUEST,"You don't have sufficient money in this deposit")
        }

        try{
            const outflowSave = this.Outflow.create(outflow)
            outflowSave.user = user
            outflowSave.outflowtype = outflowType
            outflowSave.category = category
            outflowSave.deposit = deposit
            this.logger.info("Se crear registro repositorio de outflow")
            return await this.Outflow.save(outflowSave);

        }catch(error){
            this.logger.error(error)
            throw new DatabaseException(Code.ERROR_INTERNAL,"Failed in database process")
        }
    }
    private async isAmountDisponible(depositId:number,userId:number,amount:number):Promise<boolean>{
        const { total:egressTotal } = (await this.reportRepository.getAllMoneyEgressByOneDeposit(depositId,userId))[0]
        const { total:ingressTotal }  = (await this.reportRepository.getAllMoneyIngressByOneDeposit(depositId,userId))[0]
        return (ingressTotal - egressTotal) > amount;
    }
}