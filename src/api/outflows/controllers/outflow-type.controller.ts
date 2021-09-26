import { Request } from 'express'
import { getPagination } from '../../../lib/shared/pagination/pagination';
import { Main } from '../../../lib/core/main/Main';
import { Controller } from '../../../lib/shared/main/Controller.class';
import { OutflowTypeService } from '../services/outflow-type.service';
import { OutflowTypeCreateDto } from '../dtos/outflow-type.dto';

export class OutflowTypeController extends Controller{
    constructor(
        private readonly main:Main,
        private readonly outflowTypeService: OutflowTypeService,
    ){
        super(main.logger);
    }

    async find(req:Request){
        return await this.outflowTypeService.find(await getPagination(req.query))
    }


    async create(req:Request){
        this.logger.info("Crear nuevo Tipo de entrada")
        const body = { ...req.body, userId: req["user"].id };
        const data = await this.main.validator.classValidator.validate(OutflowTypeCreateDto,body)
         return await this.outflowTypeService.create(data);

    }
}