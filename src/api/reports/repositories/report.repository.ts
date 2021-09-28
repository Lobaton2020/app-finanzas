import { Main } from "../../../lib/core/main/Main";
import Logger from "../../../lib/shared/logger/Logger";

import { Connection, getRepository, Repository } from "typeorm";
import { User } from "../../users/entities/User.entity";
import { Deposit } from "../../../api/inflows/entities/Deposit.entity";
import { Inflow } from "../../../api/inflows/entities/Intflow.entity";
import { InflowType } from "../../../api/inflows/entities/IntflowType.entity";
import { InflowDeposit } from "../../../api/inflows/entities/InflowDeposit.entity";
import { Outflow } from "../../../api/outflows/entities/Outflow.entity";

export class ReportRepository{
    private User:Repository<User>;
    private Inflow:Repository<Inflow>;
    private InflowType:Repository<InflowType>;
    private Deposit:Repository<Deposit>;
    private Outflow:Repository<Outflow>;
    private logger:Logger;
    private connection:Connection;

    constructor(private main:Main){
        this.User = getRepository(User)
        this.Deposit = getRepository(Deposit)
        this.Inflow = getRepository(Inflow)
        this.InflowType = getRepository(InflowType)
        this.Outflow = getRepository(Outflow)
        this.logger = this.main.logger;
        this.connection = this.main.database;
    }

    async getAllMoneyEgressByDeposit(userId:number,status:number= 1){
        const query = `
        SELECT d.*, COALESCE(sum(outF.amount),0) AS total  FROM deposits AS d
		LEFT JOIN outflows AS outF ON outF.depositId = d.id
        WHERE d.userId =  ${userId} AND d.status =  ${status}
		GROUP BY d.id ORDER BY outF.depositId ASC;`;
        return await this.connection.manager.query(query);
    }
    /**
     * @param userId
     * @param status
     * @returns
     * @description Only return a object with the deposit
     */
    async getAllMoneyIngressByDeposit(userId:number,status:number= 1){
        const query = `
            SELECT d.*, COALESCE(sum(i.total * (ip.porcentNumber / 100)),0) AS total  FROM deposits AS d
                LEFT JOIN inflow_deposit AS ip ON ip.depositId = d.id
                LEFT JOIN inflows AS i ON ip.inflowId = i.id  WHERE d.userId = ${userId} AND d.status = ${status}
                GROUP BY d.id ORDER BY ip.depositId ASC;`;
        return await this.connection.manager.query(query);
    }

    /**
     *
     * @param status
     * @returns
     * @description Only return a object with the deposit
     */
    async getAllMoneyEgressByOneDeposit(depositId:number,userId:number,status:number= 1){
        const query = `
        SELECT d.*, COALESCE(sum(outF.amount),0) AS total  FROM deposits AS d
		LEFT JOIN outflows AS outF ON outF.depositId = d.id
        WHERE d.userId =  ${userId} AND d.status =  ${status} AND d.id = ${depositId}`;
        return await this.connection.manager.query(query);
    }

    async getAllMoneyIngressByOneDeposit(depositId:number,userId:number,status:number= 1){
        const query = `
            SELECT d.*, COALESCE(sum(i.total * (ip.porcentNumber / 100)),0) AS total  FROM deposits AS d
                LEFT JOIN inflow_deposit AS ip ON ip.depositId = d.id
                LEFT JOIN inflows AS i ON ip.inflowId = i.id  WHERE d.userId = ${userId} AND d.status = ${status}
                AND d.id = ${depositId};`;
        return await this.connection.manager.query(query);
    }

    async countIngress (userId:number,status:number= 1){
        return await this.Inflow.count({ where: { user: userId, status }})
    }

    async countEgress (userId:number,status:number= 1){
        return await this.Outflow.count({ where: { user: userId, status }})
    }
    async getAllDeposits(userId:number,status:number= 1){
        return this.Deposit.findOne({ where:{ userId, status } })
    }
}
