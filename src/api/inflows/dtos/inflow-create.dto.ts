import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export interface IInflowPorcent{
    porcent:number,
    depositId:number
}

export class InflowCreateDto{


    @IsNotEmpty()
    @IsNumber()
    inflowTypeId:number;

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
    @IsArray()
    porcents:IInflowPorcent[];


}