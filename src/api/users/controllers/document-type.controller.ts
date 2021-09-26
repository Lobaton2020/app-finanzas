import { Request,Response } from 'express'
import { Main } from '../../../lib/core/main/Main';
import { Controller } from '../../../lib/shared/main/Controller.class';
import { DocumentTypeRepository } from '../repositories/document-type.repository'

export class DocumentTypeController extends Controller{
    constructor(
        private readonly main:Main,
        private readonly documentTypeRepositoty: DocumentTypeRepository
    ){
        super(main.logger);
    }

    async find(){
        this.logger.info("Consulta todos los roles")
        return await this.documentTypeRepositoty.find()
    }
}