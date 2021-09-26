import { IsNotEmpty,IsNumber } from "class-validator";
import { BaseNameDto } from "../../../lib/shared/dtos/base-name.dto";

export class CategoryCreate extends BaseNameDto{

    @IsNotEmpty()
    @IsNumber()
    outflowTypeId:number;
}