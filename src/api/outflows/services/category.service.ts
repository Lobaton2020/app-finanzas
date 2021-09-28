import { IPagination } from "../../../api/config/app.config";
import { CategoryCreate } from "../dtos/category.dto";
import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService{

    constructor(
        private readonly categoryRepository:CategoryRepository
    ){}

    async find(pag:IPagination, userId:number){
        return await this.categoryRepository.find(pag, userId);
    }

    async create(dataIn:CategoryCreate){
        return await this.categoryRepository.create(dataIn);
    }
}