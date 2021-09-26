import { Request, Response } from 'express'
import { getPagination } from '../../../lib/shared/pagination/pagination';
import { Main } from '../../../lib/core/main/Main';
import { Controller } from '../../../lib/shared/main/Controller.class';
import { InflowService } from '../services/inflow.service';

export class InflowController extends Controller{
    constructor(
        private readonly main:Main,
        private readonly inflowService: InflowService,
    ){
        super(main.logger);
    }

    async find(req:Request){
        this.logger.info("Obtener todos los registros - Entradas de dinero")
        return await this.inflowService.find(await getPagination(req.query))
    }


    async create(req:Request,res:Response){
        this.logger.info("Crear nueva entrada de dinero")
        const body = { ...req.body, userId: req["user"].id };
        res.json({"oppd":"sdsds"})
        // const data = await this.main.validator.classValidator.validate(DepositCreateDto,body)
        // const deposit = await this.depositService.create(data);
        // delete deposit.user
        // return deposit
    }
}