import Logger from "../logger/Logger";
import { ClassValidator } from "./ClassValidator.validate";

export class Validator{
    classValidator :ClassValidator;
    constructor(
        private logger:Logger
    ){
        this.classValidator = new ClassValidator(this.logger)
    }
}