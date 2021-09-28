import { DatabaseException } from "../../../lib/shared/exceptions/DatabaseException";
import { Main } from "../../../lib/core/main/Main";
import Logger from "../../../lib/shared/logger/Logger";
import { ValidateException } from "../../../lib/shared/exceptions/ValidateException";

import { Connection, getRepository, Repository } from "typeorm";
import { IPagination } from "../../config/app.config";
import { Code } from "../../../lib/shared/enums/response/code";
import { User } from "../../users/entities/User.entity";
import { IInflowPorcent, InflowCreateDto } from "../dtos/inflow-create.dto";
import { Inflow } from "../entities/Intflow.entity";
import { InflowType } from "../entities/IntflowType.entity";
import { Deposit } from "../entities/Deposit.entity";
import { InflowDeposit }  from "../entities/InflowDeposit.entity";
export class InflowRepository{

    private User:Repository<User>;
    private Inflow:Repository<Inflow>;
    private InflowType:Repository<InflowType>;
    private Deposit:Repository<Deposit>;
    private InflowDeposit:Repository<InflowDeposit>;
    private logger:Logger;
    private connection:Connection;

    constructor(private main:Main){
        this.User = getRepository(User)
        this.Deposit = getRepository(Deposit)
        this.Inflow = getRepository(Inflow)
        this.InflowType = getRepository(InflowType)
        this.InflowDeposit = getRepository(InflowDeposit)
        this.logger = this.main.logger;
        this.connection = this.main.database;
    }

    async find(pag:IPagination,userId:number){
        this.logger.info("Se consultan datos desde el repositorio de user")
        const opts = { relations:["inflowtype","user","inflowdeposits"],...pag, where:{ user: userId} };
        const getDeposit = (inflowdeposits)=>{
            const handle = async ({ id,...rest })=> {
                const inflowDeposit = await this.InflowDeposit.findOne({ where: { id }, relations:["deposit"] })
                return {
                    deposit: await this.Deposit.findOne(inflowDeposit.deposit.id) || {},
                    inflowdeposits: {...rest }
                };
            }
            return inflowdeposits.map(handle);
        }
        const handleInflow = async ({ inflowdeposits,...rest })=> ({ ...rest, deposits: await Promise.all(getDeposit(inflowdeposits)) });
        const data = await (await this.Inflow.find(opts)).map(handleInflow);
        return await Promise.all(data);

    }

    async create(inflowIn:InflowCreateDto){

        const { description, inflowTypeId, total, setDate, porcents,userId  } = inflowIn;
        const inflowType = await this.InflowType.findOne({ id: inflowTypeId });
        if(!inflowType){
            throw new ValidateException(Code.BAD_REQUEST,"The inflowType not exists")
        }
        const user = await this.User.findOne({ id: userId });
        if(!user){
            throw new ValidateException(Code.BAD_REQUEST,"The user not exists")
        }
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try{
            const inflow = new Inflow();
            inflow.inflowtype = inflowType;
            inflow.description = description;
            inflow.total = total
            inflow.setDate = setDate;
            inflow.user = user
            try{
                const inflowSaved = await queryRunner.manager.save(inflow)
                for(let porcent of porcents){
                    await queryRunner.manager.save(await this.prepareInflowDeposit(porcent,inflowSaved))
                }
                await queryRunner.commitTransaction();
            }catch (err) {
                await queryRunner.rollbackTransaction();
                this.logger.error(err)
                throw new DatabaseException(Code.ERROR_INTERNAL,"Failed transactions",[err.message || err])
            }
            finally {
                await queryRunner.release();
            }
            this.logger.info("Se realiza transaccion para nueva entrada de dinero")
            delete inflowIn.userId
            return inflowIn;
        }catch(error){
            this.logger.error(error)
            throw new DatabaseException(Code.ERROR_INTERNAL,"Failed in database process")
        }
    }
    private async prepareInflowDeposit(porcent:IInflowPorcent,inflow:Inflow){
        const deposit:Deposit = await this.Deposit.findOne({ id: porcent.depositId })
        if(!deposit){
            throw new Error("Deposit Not found")
        }

        const inflowDeposit = new InflowDeposit()
        inflowDeposit.porcentNumber = porcent.porcent
        inflowDeposit.deposit = deposit
        inflowDeposit.inflow = inflow
        return inflowDeposit
    }
}