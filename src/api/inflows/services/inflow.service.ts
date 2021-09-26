import { IPagination } from "../../config/app.config";
import { InflowTypeCreateDto } from "../dtos/inflow-type.dto";
import { InflowRepository } from "../repositories/inflow.repository";

export class InflowService{

    constructor(
        private readonly inflowRepository:InflowRepository
    ){}

    async find(pag:IPagination){
        return await this.inflowRepository.find(pag);
    }

    async create(dataIn:InflowTypeCreateDto){
        return await this.inflowRepository.create(dataIn);
    }
}