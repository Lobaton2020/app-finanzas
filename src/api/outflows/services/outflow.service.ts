import { IPagination } from "../../config/app.config";
import { CategoryCreate } from "../dtos/category.dto";
import { OutflowRepository } from "../repositories/outflow.repository";

export class OutflowService{

    constructor(
        private readonly outflowRepository:OutflowRepository
    ){}

    async find(pag:IPagination){
        return await this.outflowRepository.find(pag);
    }

    async create(dataIn:CategoryCreate){
        return await this.outflowRepository.create(dataIn);
    }
}