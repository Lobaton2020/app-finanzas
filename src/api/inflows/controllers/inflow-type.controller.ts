import { Request } from 'express'
import { getPagination } from '../../../lib/shared/pagination/pagination';
import { Main } from '../../../lib/core/main/Main';
import { Controller } from '../../../lib/shared/main/Controller.class';
import { InflowTypeService } from '../services/inflow-type.service';
import { InflowTypeCreateDto } from '../dtos/inflow-type.dto';

export class InflowTypeController extends Controller{
    constructor(
        private readonly main:Main,
        private readonly inflowTypeService: InflowTypeService,
    ){
        super(main.logger);
    }

    async find(req:Request){
        return await this.inflowTypeService.find(await getPagination(req.query),req["user"]["id"])
    }


    async create(req:Request){
        this.logger.info("Crear nuevo Tipo de entrada")
        const body = { ...req.body, userId: req["user"].id };
        const data = await this.main.validator.classValidator.validate(InflowTypeCreateDto,body)
        const inflowType = await this.inflowTypeService.create(data);
        delete inflowType.user
        return inflowType
    }
}