import { Request,Response } from 'express'
import { UserService } from '../../users/services/user.service';
import { Main } from '../../../lib/core/main/Main';
import { Controller } from '../../../lib/shared/main/Controller.class';
import { UserCreateDto } from '../../users/dtos/UserCreate.dto';


export class AuthController extends Controller{
    constructor(
        private readonly main:Main,
        private readonly userService: UserService
    ){
        super(main.logger);
    }

    async signup(req:Request, res:Response){
        this.logger.info("Crear nuevo usuario")
        const user = await this.main.validator.classValidator.validate(UserCreateDto,req.body)
        const newUser = await this.userService.create(user)
        console.log(newUser)
        res.json(newUser)
    }
}