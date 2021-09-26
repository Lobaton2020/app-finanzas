import { AdminAutorization } from '../../auth/middlewares/authorization-type';
import { Main } from '../../../lib/core/main/Main';
import { Execute } from '../../../lib/shared/main/Execute.function';
import { RolController } from '../controllers/rol.controller';
import { UserController } from '../controllers/user.controller';
import { RolRepository } from '../repositories/rol.repository';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { DocumentTypeRepository } from '../repositories/document-type.repository';
import { DocumentTypeController } from "../controllers/document-type.controller"
export default (main:Main)=>{
    //declaratins
    //Users
    const { router } = main;
    const repository = new UserRepository(main);
    const service = new UserService(repository);
    const controller = new UserController(main,service);
    router.get('/users', AdminAutorization(main), Execute(controller,'findAll'))
    router.post('/users',AdminAutorization(main),  Execute(controller,'create'))

    //roles
    const repositoryRol = new RolRepository(main);
    const controllerRol = new RolController(main,repositoryRol);
     router.get('/rols', Execute(controllerRol,'find'))
     //document type
     const repositoryDocumentType = new DocumentTypeRepository(main);
     const controllerDocumentType = new DocumentTypeController(main,repositoryDocumentType);
     router.get('/documenttypes', Execute(controllerDocumentType,'find'))

};