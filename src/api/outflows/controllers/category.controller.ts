import { Request,Response } from 'express'
import { Main } from '../../../lib/core/main/Main';
import { Controller } from '../../../lib/shared/main/Controller.class';

import { CategoryCreate } from '../dtos/category.dto';
import { getPagination } from '../../../lib/shared/pagination/pagination';
import { CategoryService } from '../services/category.service';

export class CategoryController extends Controller{
    constructor(
        private readonly main:Main,
        private readonly categoryService: CategoryService,
    ){
        super(main.logger);
    }

    async find(req:Request){
        this.logger.info("Crear nuevo usuario - SignUp")
        return await this.categoryService.find(await getPagination(req.query), req["user"]["id"])
    }


    async create(req:Request){
        this.logger.info("Crear nuevo usuario - SignUp")
        const body = { ...req.body,userId: req["user"].id };
        const data = await this.main.validator.classValidator.validate(CategoryCreate,body)
        return await this.categoryService.create(data)
    }
}