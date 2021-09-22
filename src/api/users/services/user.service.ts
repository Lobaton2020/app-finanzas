import { UserRepository } from "../repositories/user.repository";
import axios from "axios"
export class UserService{

    constructor(
        private readonly userRepository:UserRepository
    ){}

    async findAll(){
        return (await axios.get("https://jsonplaceholder.typicode.com/users/")).data;
        // return await this.userRepository.findAll();
    }

    async create(user:any){
        return await this.userRepository.create(user);
    }
}