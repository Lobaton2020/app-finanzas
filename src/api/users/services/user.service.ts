import { UserCreateDto } from "../dtos/UserCreate.dto";
import { UserRepository } from "../repositories/user.repository";
export class UserService{

    constructor(
        private readonly userRepository:UserRepository
    ){}

    async findAll(){
        // return (await axios.get("https://jsonplaceholder.typicode.com/users/")).data;
        return await this.userRepository.findAll();
    }

    async create(userIn:UserCreateDto){
        const user = await this.userRepository.create(userIn);
        delete user.password
        return user
    }
}