import { getRepository } from "typeorm";
import { Main } from "../../../lib/core/main/Main";
import Logger from "../../../lib/shared/logger/Logger";
import { User } from "../entities/User.entity";

export class UserRepository{
    private User:any;
    private logger:Logger;

    constructor(private main:Main){
        this.User = getRepository(User)
        this.logger = this.main.logger;
    }

    async findAll(){
        this.logger.info("Se consulan datos desde el repositorio de user")
        return await this.User.find();
    }

    async create(user:any){
        this.logger.info("Se crear registro repositorio de user")
        return await this.User.save(user);
    }
}