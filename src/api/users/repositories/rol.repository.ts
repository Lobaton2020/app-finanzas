import { getRepository, Repository } from "typeorm";
import { Main } from "../../../lib/core/main/Main";
import Logger from "../../../lib/shared/logger/Logger";
import { Rol } from "../entities/Rol.entity";

export class RolRepository{
    private Rol:Repository<Rol>;
    private logger:Logger;

    constructor(private main:Main){
        this.Rol = getRepository(Rol)
        this.logger = this.main.logger;
    }

    async findAll(){
        this.logger.info("Se sonsultan roles")
        return await this.Rol.find();
    }
}