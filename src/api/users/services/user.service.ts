import { IPagination } from "src/api/config/app.config";
import { UserCreateDto } from "../dtos/UserCreate.dto";
import { UserRepository } from "../repositories/user.repository";
export class UserService{

    constructor(
        private readonly userRepository:UserRepository
    ){}

    async find(pag:IPagination){
        return await this.userRepository.find(pag);
    }

    async create(userIn:UserCreateDto){
        const user = await this.userRepository.create(userIn);
        delete user.password
        return user
    }
}