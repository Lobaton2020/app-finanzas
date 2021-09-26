import { Request,Response } from 'express'
import { getPagination } from '../../..//lib/shared/pagination/pagination';
import { Main } from '../../../lib/core/main/Main';
import { Controller } from '../../../lib/shared/main/Controller.class';
import { UserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';


export class UserController extends Controller{
    constructor(
        private readonly main:Main,
        private readonly userService: UserService
    ){
        super(main.logger);
    }

    async findAll(req:Request, res:Response){
        this.logger.info("Consulta todos los usuarios")
        return await this.userService.find(await getPagination(req.query));
    }

    async create(req:Request, res:Response){
        this.logger.info("Crear un usuario")
        const user = await this.main.validator.classValidator.validate(UserDto,req.body);
        return await this.userService.create(user)

    }
}