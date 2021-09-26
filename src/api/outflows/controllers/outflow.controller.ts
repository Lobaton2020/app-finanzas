import { Request,Response } from 'express'
import { Main } from '../../../lib/core/main/Main';
import { Controller } from '../../../lib/shared/main/Controller.class';

import { CategoryCreate } from '../dtos/category.dto';
import { getPagination } from '../../../lib/shared/pagination/pagination';
import { OutflowService } from '../services/outflow.service';

export class OutflowController extends Controller{
    constructor(
        private readonly main:Main,
        private readonly outflowService: OutflowService,
    ){
        super(main.logger);
    }

    async find(req:Request){
        this.logger.info("Crear nuevo usuario - SignUp")
        return await this.outflowService.find(await getPagination(req.query))
    }


    async create(req:Request){
        this.logger.info("Crear nuevo usuario - SignUp")
        const body = { ...req.body,userId: req["user"].id };
        const data = await this.main.validator.classValidator.validate(CategoryCreate,body)
        return await this.outflowService.create(data)
    }
}