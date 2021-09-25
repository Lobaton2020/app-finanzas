import { IsBoolean, IsDate, IsDateString, IsEmail, IsInt,IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UserCreateDto {

    @IsNotEmpty()
    @IsInt()
    rolId:string;

    @IsNotEmpty()
    @IsInt()
    documentTypeId:string;

    @IsNotEmpty()
    @IsInt()
    documentNumber:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    completeName:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;

    @IsOptional()
    @IsString()
    image:string;

    @IsDateString()
    @IsNotEmpty()
    bornDate:Date;

}