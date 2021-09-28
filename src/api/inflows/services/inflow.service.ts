import { Code } from "../../../lib/shared/enums/response/code";
import { Message } from "../../../lib/shared/enums/response/message";
import { ValidateException } from "../../../lib/shared/exceptions/ValidateException";
import { IPagination } from "../../config/app.config";
import { InflowCreateDto } from "../dtos/inflow-create.dto";
import { InflowRepository } from "../repositories/inflow.repository";

export class InflowService{

    constructor(
        private readonly inflowRepository:InflowRepository
    ){}

    async find(pag:IPagination,userId:number){
        return await this.inflowRepository.find(pag,userId);
    }

    async create(dataIn:InflowCreateDto){
        dataIn.porcents.forEach(({ porcent,depositId }) =>{
            if(!porcent || !depositId){
                throw new ValidateException(Code.BAD_REQUEST,Message.BAD_REQUEST,[ "Debes enviar de manera correcta los porcentajes" ])
            }
        })
        const sumPorcents = dataIn.porcents.map(({ porcent })=> porcent).reduce((prev,curr)=>  prev  + curr ,0);
        if(sumPorcents !== 100){
            throw new ValidateException(Code.BAD_REQUEST,Message.BAD_REQUEST,[ "La suma de los porcentajes debe ser igual a 100" ])
        }
        return await this.inflowRepository.create(dataIn);
    }
}