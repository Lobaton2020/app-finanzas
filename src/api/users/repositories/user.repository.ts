import { DatabaseException } from "../../../lib/shared/exceptions/DatabaseException";
import { Main } from "../../../lib/core/main/Main";
import Logger from "../../../lib/shared/logger/Logger";
import { ValidateException } from "../../../lib/shared/exceptions/ValidateException";

import { FindOneOptions, getRepository, Repository } from "typeorm";
import { User } from "../entities/User.entity";
import { UserCreateDto } from "../dtos/UserCreate.dto";
import { Rol } from "../entities/Rol.entity";
import { DocumentType } from "../entities/DocumentType.entity";
import { IPagination } from "src/api/config/app.config";

export class UserRepository{

    private User:Repository<User>;
    private Rol:Repository<Rol>;
    private DocumentType:Repository<DocumentType>;
    private logger:Logger;

    constructor(private main:Main){
        this.User = getRepository(User)
        this.Rol = getRepository(Rol)
        this.DocumentType = getRepository(DocumentType)
        this.logger = this.main.logger;
    }

    async find(pag:IPagination){
        this.logger.info("Se consultan datos desde el repositorio de user")
        return await this.User.find(pag);
    }

    async findOneById(id:number){
        const options:FindOneOptions = {
            relations: ["rol","documentType"],
            select:["id","completeName","documentNumber","email"],
            where: { id }
        };
        return await this.User.findOne(options);
    }

    async findOneByEmail(email:string){
        const options:FindOneOptions = {
            relations: ["rol","documentType"],
            select:["id","completeName","documentNumber","email","password","createdAt"],
            where: { email }
        };
        return await this.User.findOne(options);
    }

    async create(user:UserCreateDto){

        const { rolId, documentTypeId, email, documentNumber } = user;
        const options = {
            where : [
                { email }, { documentNumber }
            ]
         }
        if(await this.User.findOne(options)){
            throw new ValidateException(400,"[email or documentNumber] already exists")
        }

        const rol = await this.Rol.findOne(rolId)
        const documentType = await this.DocumentType.findOne(documentTypeId)

        if(!rol || !documentType){
            throw new ValidateException(400,"[rolId or documentType] are invalid")
        }

        try{
            const userSave = this.User.create(user)
            userSave.rol = rol
            userSave.documentType = documentType
            this.logger.info("Se crear registro repositorio de user")
            return await this.User.save(userSave);
        }catch(error){
            this.logger.error(error)
            throw new DatabaseException(500,"Failed in database process")
        }
    }
}