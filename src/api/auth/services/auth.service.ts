import { User } from "../../../api/users/entities/User.entity";
import { UserRepository } from "../../../api/users/repositories/user.repository";
import { SignInDto } from "../dtos/SignIn.dto";
import { compare } from "bcryptjs"
import { NotFoundException } from "../../../lib/shared/exceptions/NotFoundException";
import jwt from 'jsonwebtoken'
import { HOURS_EXPIRED_TOKEN_REFRESH, MINUTES_EXPIRED_TOKEN, SECRET_KEY, SECRET_KEY_REFRESH } from "../../../api/config/env.config";
import { Code } from "../../../lib/shared/enums/response/code";
import { TokenException } from "../../../lib/shared/exceptions/ValidateException";

export class AuthService{
    constructor(
        private readonly userRepository:UserRepository
    ){}

    async signin(credentials:SignInDto){
        const { password, email } = credentials;
        const user:User = await this.userRepository.findOneByEmail(email);
        if (!user || !(await compare(password, user.password))) {
            throw new NotFoundException(Code.NOT_FOUND,"User not found", ["Invalid Credentials"])
        }
        delete user.password;
        const payload = { role: user.rol.name, sub: user.id }
        return {
            user,
            accessToken: this.generateJWT(SECRET_KEY, payload,`${MINUTES_EXPIRED_TOKEN}m`),
            refreshToken:this.generateJWT(SECRET_KEY_REFRESH, payload,`${HOURS_EXPIRED_TOKEN_REFRESH}h`),
        }
    }

    async refreshToken(refreshToken:string){
        const { sub } = this.verifyToken(SECRET_KEY_REFRESH,refreshToken)
        const id = parseInt(sub as string);
        if(!id) throw new TokenException(Code.BAD_REQUEST,"Token con payload invalido");
        const user:User = await this.userRepository.findOneById(id);
        if (!user) {
            throw new NotFoundException(Code.NOT_FOUND,"User not found")
        }
        delete user.password;
        const payload = { role: user.rol.name, sub: user.id }
        return {
            accessToken: this.generateJWT(SECRET_KEY, payload,`${MINUTES_EXPIRED_TOKEN}m`),
        }
    }

    private verifyToken(secretKey:string,token:string){
        try{
            return jwt.verify(token,secretKey);
        }catch(error){
            throw new TokenException(Code.BAD_REQUEST,"Error al validar el token",[]);

        }
    }

    private generateJWT(secretKey:string,payload:any,timeExp = "1h"){
        return jwt.sign(payload, secretKey, { expiresIn: timeExp });
    }
}