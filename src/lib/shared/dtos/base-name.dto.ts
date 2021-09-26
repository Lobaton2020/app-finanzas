import { IsNotEmpty,IsNumber,IsString } from "class-validator";

export class BaseNameDto {

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsNumber()
    userId:number;
}