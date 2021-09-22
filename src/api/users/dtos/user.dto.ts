import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    @MinLength(6)
    name:string = '';
}