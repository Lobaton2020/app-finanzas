import { IPagination } from "../../config/app.config";
import { DepositCreateDto } from "../dtos/deposit.dto";
import { DepositRepository } from "../repositories/deposit.repository";

export class DepositService{

    constructor(
        private readonly depositRepository:DepositRepository
    ){}

    async find(pag:IPagination,userId:number){
        return await this.depositRepository.find(pag,userId);
    }

    async create(dataIn:DepositCreateDto){
        return await this.depositRepository.create(dataIn);
    }
}