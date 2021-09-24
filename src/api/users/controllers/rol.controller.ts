import { Request,Response } from 'express'
import { Main } from '../../../lib/core/main/Main';
import { Controller } from '../../../lib/shared/main/Controller.class';
import { RolRepository } from '../repositories/rol.repository';
import { UserService } from '../services/user.service';


export class RolController extends Controller{
    constructor(
        private readonly main:Main,
        private readonly rolRepositoty: RolRepository
    ){
        super(main.logger);
    }

    async find(req:Request, res:Response){
        this.logger.info("Consulta todos los roles")
        res.json(await this.rolRepositoty.findAll())
    }
}