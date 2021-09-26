import { IsNotEmpty, IsNumberString, IsOptional } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsNotEmpty()
    offset?:string;

    @IsOptional()
    @IsNotEmpty()
    limit?:string;


}