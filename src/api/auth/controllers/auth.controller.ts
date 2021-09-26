import { Request,Response } from 'express'
import { Main } from '../../../lib/core/main/Main';
import { Controller } from '../../../lib/shared/main/Controller.class';

import { UserCreateDto } from '../../users/dtos/UserCreate.dto';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dtos/SignIn.dto';
import { UserService } from '../../users/services/user.service';
import { Code } from "../../../lib/shared/enums/response/code";
import {  ValidateException } from "../../../lib/shared/exceptions/ValidateException";

export class AuthController extends Controller{
    constructor(
        private readonly main:Main,
        private readonly userService: UserService,
        private readonly authService: AuthService
    ){
        super(main.logger);
    }

    async signup(req:Request){
        this.logger.info("Crear nuevo usuario - SignUp")
        const user = await this.main.validator.classValidator.validate(UserCreateDto,req.body)
        return await this.userService.create(user)
    }

    async signin(req:Request){
        this.logger.info("Validacion de datos - SignIn")
        await this.main.validator.classValidator.validate(SignInDto,req.body)
        return await this.authService.signin(req.body)
    }

    async refreshToken(req:Request){
        this.logger.info("Se renueva el token")
        if(!req.body.refreshtoken) throw new ValidateException(Code.BAD_REQUEST,"Send the body param 'refreshtoken'")
        return await this.authService.refreshToken(req.body.refreshtoken as string)

    }
}