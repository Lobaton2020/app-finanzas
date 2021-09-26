import { IPagination, PAGINATION } from "../../../api/config/app.config";
import { Code } from "../enums/response/code";
import { ValidateException } from "../exceptions/ValidateException";
import Logger from "../logger/Logger";
import { ClassValidator } from "../validator/ClassValidator.validate";
import { PaginationDto } from "./pagination.dto";

/**
 * @param query Need receive for pagination two params:
 * 1- offset
 * 2- limit
 * @description Must to validate the pagination of the aplication
*/
export const getPagination = async (query: any, config:IPagination = PAGINATION):Promise<IPagination> =>{
    const logger = new Logger();
    let {
        limit:  take = config.take,
        offset: skip = config.skip
    } = query;
    try{
        await new ClassValidator(logger).validate(PaginationDto,{ limit: take, offset: skip })
        take = parseInt(take)
        skip = parseInt(skip)
    }catch(error){
        logger.error(`${error}`,"From pagination")
        const errors = error?.errors || ["Somethig went wrong"];
        throw new ValidateException(Code.BAD_REQUEST,"Paginacion error in validation", errors);
    }

    if(take > config.take){
        throw new ValidateException(Code.BAD_REQUEST,"Paginacion invalid",[`The max limit number is ${config.take}`]);
    }
    return { take, skip }
}