import { Code } from "../../../lib/shared/enums/response/code";
import { ValidateException } from "../../../lib/shared/exceptions/ValidateException";
import { IPagination } from "../../config/app.config";
import { OutflowCreateDto } from "../dtos/outflow-create.dto";
import { OutflowRepository } from "../repositories/outflow.repository";
import { ReportRepository } from "../../../api/reports/repositories/report.repository"

export class OutflowService{
    constructor(
        private readonly outflowRepository:OutflowRepository,
        private readonly reportRepository:ReportRepository
    ){}

    async find(pag:IPagination,userId:number){
        return await this.outflowRepository.find(pag, userId);
    }

    async create(dataIn:OutflowCreateDto){
        return await this.outflowRepository.create(dataIn);
    }

}