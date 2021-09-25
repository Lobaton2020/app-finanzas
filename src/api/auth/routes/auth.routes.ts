import { UserRepository } from '../../users/repositories/user.repository';
import { UserService } from '../../users/services/user.service';
import { Main } from '../../../lib/core/main/Main';
import { Execute } from '../../../lib/shared/main/Wrapper.function';
import { AuthController } from '../controllers/auth.controller';

export default (main:Main)=>{
    const { router } = main;
    const repository = new UserService(new UserRepository(main));
    const controller = new AuthController(main,repository);
    router.post('/signup', Execute(controller,'signup'))
};