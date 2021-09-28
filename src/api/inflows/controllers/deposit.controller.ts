import { Request } from 'express'
import { getPagination } from '../../../lib/shared/pagination/pagination';
import { Main } from '../../../lib/core/main/Main';
import { Controller } from '../../../lib/shared/main/Controller.class';
import { DepositCreateDto } from '../dtos/deposit.dto';
import { DepositService } from '../services/deposit.service';

export class DepositController extends Controller{
    constructor(
        private readonly main:Main,
        private readonly depositService: DepositService,
    ){
        super(main.logger);
    }

    async find(req:Request){
        this.logger.info("Crear nuevo usuario - SignUp")
        return await this.depositService.find(await getPagination(req.query), req["user"]["id"])
    }

    async create(req:Request){
        this.logger.info("Crear nuevo Deposito - SignUp")
        const body = { ...req.body, userId: req["user"].id };
        const data = await this.main.validator.classValidator.validate(DepositCreateDto,body)
        const deposit = await this.depositService.create(data);
        delete deposit.user
        return deposit
    }
}