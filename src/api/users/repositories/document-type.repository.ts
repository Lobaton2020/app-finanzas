import { getRepository, Repository } from "typeorm";
import { Main } from "../../../lib/core/main/Main";
import Logger from "../../../lib/shared/logger/Logger";
import { DocumentType } from "../entities/DocumentType.entity";


export class DocumentTypeRepository{
    private documentType:Repository<DocumentType>;
    private logger:Logger;

    constructor(private main:Main){
        this.documentType = getRepository(DocumentType)
        this.logger = this.main.logger;
    }

    async find(){
        this.logger.info("Se sonsultan tipos de documento")
        return await this.documentType.find();
    }
}