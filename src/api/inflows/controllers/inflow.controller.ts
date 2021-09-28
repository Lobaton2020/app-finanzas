import { Request } from 'express'
import { getPagination } from '../../../lib/shared/pagination/pagination';
import { Main } from '../../../lib/core/main/Main';
import { Controller } from '../../../lib/shared/main/Controller.class';
import { InflowService } from '../services/inflow.service';
import { InflowCreateDto } from '../dtos/inflow-create.dto';

export class InflowController extends Controller{
    constructor(
        private readonly main:Main,
        private readonly inflowService: InflowService,
    ){
        super(main.logger);
    }

    async find(req:Request){
        this.logger.info("Obtener todos los registros - Entradas de dinero")
        return await this.inflowService.find(await getPagination(req.query),req["user"]["id"])
    }


    async create(req:Request){
        this.logger.info("Crear nueva entrada de dinero")
        const body = { ...req.body, userId: req["user"].id };

        const data = await this.main.validator.classValidator.validate(InflowCreateDto,body)
        return await this.inflowService.create(data);

    }
}