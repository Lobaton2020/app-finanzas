import { DatabaseException } from "../../../lib/shared/exceptions/DatabaseException";
import { Main } from "../../../lib/core/main/Main";
import Logger from "../../../lib/shared/logger/Logger";
import { ValidateException } from "../../../lib/shared/exceptions/ValidateException";

import { getRepository, Repository } from "typeorm";
import { IPagination } from "../../../api/config/app.config";
import { Category } from "../entities/Category.entity";
import { CategoryCreate } from "../dtos/category.dto";
import { Code } from "../../../lib/shared/enums/response/code";
import { User } from "../../../api/users/entities/User.entity";
import { OutflowType } from "../entities/OutflowType.entity";

export class CategoryRepository{

    private User:Repository<User>;
    private Category:Repository<Category>;
    private OutflowType:Repository<OutflowType>;
    private logger:Logger;

    constructor(private main:Main){
        this.User = getRepository(User)
        this.Category = getRepository(Category)
        this.OutflowType = getRepository(OutflowType)
        this.logger = this.main.logger;
    }

    async find(pag:IPagination){
        this.logger.info("Se consultan datos desde el repositorio de user")
        return await this.Category.find(pag);
    }

    async create(category:CategoryCreate){

        const user =  await this.User.findOne({ id:category.userId });
        if(!user){
            throw new ValidateException(Code.BAD_REQUEST,"The user not exists")
        }
        if(await this.Category.findOne({ name: category.name })){
            throw new ValidateException(Code.BAD_REQUEST,"The category already exists")
        }

        const outflowType = await this.OutflowType.findOne({ id: category.outflowTypeId })
        if(!outflowType){
            throw new ValidateException(Code.BAD_REQUEST,"The 'outflowTypeId' is invalid")
        }

        try{
            const categorySave = this.Category.create(category)
            categorySave.user = user
            categorySave.outflowtype = outflowType
            this.logger.info("Se crear registro repositorio de category")
            const newData =  await this.Category.save(categorySave);
            delete newData.user;
            return newData;


        }catch(error){
            this.logger.error(error)
            throw new DatabaseException(Code.ERROR_INTERNAL,"Failed in database process")
        }
    }
}