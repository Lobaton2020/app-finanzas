import { DatabaseException } from "../../../lib/shared/exceptions/DatabaseException";
import { getRepository, Repository } from "typeorm";
import { Main } from "../../../lib/core/main/Main";
import Logger from "../../../lib/shared/logger/Logger";
import { User } from "../entities/User.entity";
import { UserCreateDto } from "../dtos/UserCreate.dto";
import { Rol } from "../entities/Rol.entity";
import { DocumentType } from "../entities/DocumentType.entity";
import { ValidateException } from "../../../lib/shared/exceptions/ValidateException";

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

    async findAll(){
        this.logger.info("Se consulan datos desde el repositorio de user")
        return await this.User.find();
    }

    async create(user:UserCreateDto){
        const {rolId, documentTypeId, email,documentNumber } = user;

        if(await this.User.findOne({email})){
            throw new ValidateException(400,"email already exists","error")
        }

        if(await this.User.findOne({documentNumber})){
            throw new ValidateException(400,"documentNumber already exists","error")
        }

        try{
            const userSave = this.User.create(user)
            userSave.rol = await this.Rol.findOne(user.rolId)
            userSave.documentType = await this.DocumentType.findOne(user.documentTypeId)
            this.logger.info("Se crear registro repositorio de user")
            console.log(user)
            return await this.User.save(userSave);
        }catch(error){
            console.log(error)
            this.logger.error("",error)
            throw new DatabaseException(500,"Failed in database process","error")
        }
    }
}