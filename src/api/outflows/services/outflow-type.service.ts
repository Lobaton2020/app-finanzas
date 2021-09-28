import { IPagination } from "../../config/app.config";
import { OutflowTypeCreateDto } from "../dtos/outflow-type.dto";
import { OutflowTypeRepository } from "../repositories/outflow-type.repository";

export class OutflowTypeService{

    constructor(
        private readonly outflowTypeRepository:OutflowTypeRepository
    ){}

    async find(pag:IPagination,userId:number){
        return await this.outflowTypeRepository.find(pag,userId);
    }

    async create(dataIn:OutflowTypeCreateDto){
        return await this.outflowTypeRepository.create(dataIn);
    }
}