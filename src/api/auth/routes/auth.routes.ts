import { UserRepository } from '../../users/repositories/user.repository';
import { UserService } from '../../users/services/user.service';
import { Main } from '../../../lib/core/main/Main';
import { Execute } from '../../../lib/shared/main/Execute.function';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { PublicAutorization } from '../middlewares/authorization-type';

export default (main:Main)=>{
    const { router } = main;
    const service= new AuthService(new UserRepository(main));
    const userService = new UserService(new UserRepository(main))
    const controller = new AuthController(main,userService,service);
    router.post('/signup', PublicAutorization(main),Execute(controller,'signup'))
    router.post('/signin', PublicAutorization(main),Execute(controller,'signin'))
    router.post('/refreshToken', PublicAutorization(main),Execute(controller,'refreshToken'))
};