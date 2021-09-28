import { Request,Response } from 'express'
import { Main } from '../../../lib/core/main/Main';
import { Controller } from '../../../lib/shared/main/Controller.class';
import { ReportRepository } from '../repositories/report.repository';

export class ReportController extends Controller{
    constructor(
        private readonly main:Main,
        private readonly reportRepository:ReportRepository,
    ){
        super(main.logger);
    }

    async egressByDeposit(req:Request){
        this.logger.info("Generate report egress by deposit")
        return await this.reportRepository.getAllMoneyEgressByDeposit(req["user"]["id"])
    }


    async ingressByDeposit(req:Request){
        this.logger.info("Generate report ingress by deposit")
        return await this.reportRepository.getAllMoneyIngressByDeposit(req["user"]["id"])
    }


    async resume(req:Request){
        this.logger.info("Get reume of reports")
        const egress = await this.reportRepository.getAllMoneyEgressByDeposit(req["user"]["id"])
        const ingress = await this.reportRepository.getAllMoneyIngressByDeposit(req["user"]["id"])
        const totalEgress = this.reduceObject(egress,"total")
        const totalIngress = this.reduceObject(ingress,"total")

        return {
            totalEgress,
            totalIngress,
            remainingMoney: totalIngress - totalEgress,
            countIngress: await this.reportRepository.countIngress(req["user"]["id"]),
            countEgress: await this.reportRepository.countEgress(req["user"]["id"]),
        }
    }

    private reduceObject(objects:any[],propertie:string){
        return objects?.reduce((ac,actual)=> ac + actual[propertie],0)
    }

}