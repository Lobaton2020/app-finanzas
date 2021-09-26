import { IPagination } from "../../config/app.config";
import { InflowTypeCreateDto } from "../dtos/inflow-type.dto";
import { InflowTypeRepository } from "../repositories/inflow-type.repository";

export class InflowTypeService{

    constructor(
        private readonly inflowTypeRepository:InflowTypeRepository
    ){}

    async find(pag:IPagination){
        return await this.inflowTypeRepository.find(pag);
    }

    async create(dataIn:InflowTypeCreateDto){
        return await this.inflowTypeRepository.create(dataIn);
    }
}