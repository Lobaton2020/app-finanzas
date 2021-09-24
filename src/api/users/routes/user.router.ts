import { Main } from '../../../lib/core/main/Main';
import { Execute } from '../../../lib/shared/main/Wrapper.function';
import { RolController } from '../controllers/rol.controller';
import { UserController } from '../controllers/user.controller';
import { RolRepository } from '../repositories/rol.repository';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';

export default (main:Main)=>{
    //declarations
    let repository,controller;
    //Users
    const { router } = main;
     repository = new UserRepository(main);
    const service = new UserService(repository);
     controller = new UserController(main,service);

    router.get('/users', Execute(controller,'findAll'))
    router.post('/users', Execute(controller,'create'))

    //roles
     repository = new RolRepository(main);
     controller = new RolController(main,repository);
     router.get('/rols', Execute(controller,'find'))
};