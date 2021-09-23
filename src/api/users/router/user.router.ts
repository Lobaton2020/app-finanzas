import { Main } from '../../../lib/core/main/Main';
import { Execute } from '../../../lib/shared/main/Wrapper.function';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';

export default (main:Main)=>{
    const { router } = main;
    const repository = new UserRepository(main);
    const service = new UserService(repository);
    const controller = new UserController(main,service);

    router.get('/users', Execute(controller,'findAll'))
    router.post('/users', Execute(controller,'create'))
};