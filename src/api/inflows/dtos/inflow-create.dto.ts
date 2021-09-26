import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class InflowCreateDto{

    @IsNotEmpty()
    @IsNumber()
    total:number;

    @IsNotEmpty()
    @IsString()
    description:string;

    @IsNotEmpty()
    @IsDateString()
    setDate:Date;

    @IsNotEmpty()
    @IsNumber()
    userId:number;

    @IsNotEmpty()
    @IsNumber()
    inflowTypeId:number;

    @IsNotEmpty()
    @IsNumber()
    s:number;


}