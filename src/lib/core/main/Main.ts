import { Router } from "express";
import { Connection } from "typeorm";
import Logger from "../../shared/logger/Logger";
import { Validator } from "../../shared/validator/Validator";

export class Main{

    constructor(
        public logger:Logger,
        public router:Router,
        public validator:Validator,
        public database:Connection
    ){}
}