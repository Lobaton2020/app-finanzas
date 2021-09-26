import { UserAutorization } from "../../../api/auth/middlewares/authorization-type";
import { Execute } from "../../../lib/shared/main/Execute.function";
import { Main } from "../../../lib/core/main/Main";
import { DepositController } from "../controllers/deposit.controller";
import { DepositRepository } from "../repositories/deposit.repository";
import { DepositService } from "../services/deposit.service";
import { InflowTypeController } from "../controllers/inflow-type.controller";
import { InflowTypeRepository } from "../repositories/inflow-type.repository";
import { InflowTypeService } from "../services/inflow-type.service";
import { InflowController } from "../controllers/inflow.controller";
import { InflowRepository } from "../repositories/inflow.repository";
import { InflowService } from "../services/inflow.service";

export default (main:Main)=>{

        const { router } = main;
        //inflows
        const repositoryInflow = new InflowRepository(main);
        const serviceInflow = new InflowService(repositoryInflow);
        const controllerInflow = new InflowController(main,serviceInflow);
        router.get('/inflows', UserAutorization(main), Execute(controllerInflow,'find'))
        router.post('/inflows',UserAutorization(main), Execute(controllerInflow,'create'))

        //category
        const repositoryDeposit = new DepositRepository(main);
        const repositoryService = new DepositService(repositoryDeposit);
        const controllerDeposit = new DepositController(main,repositoryService);
         router.get('/inflows/deposits',UserAutorization(main) ,Execute(controllerDeposit,'find'))
         router.post('/inflows/deposits',UserAutorization(main) ,Execute(controllerDeposit,'create'))


        //inflow type
        const repositoryInflowType = new InflowTypeRepository(main);
        const serviceInflowType = new InflowTypeService(repositoryInflowType);
        const controllerInflowType = new InflowTypeController(main,serviceInflowType);
        router.get('/inflows/types',UserAutorization(main) ,Execute(controllerInflowType,'find'))
        router.post('/inflows/types',UserAutorization(main) ,Execute(controllerInflowType,'create'))

}