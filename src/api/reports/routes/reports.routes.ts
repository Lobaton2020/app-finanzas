import { UserAutorization } from "../../../api/auth/middlewares/authorization-type";
import { Execute } from "../../../lib/shared/main/Execute.function";
import { Main } from "../../../lib/core/main/Main";
import { ReportController } from "../controllers/report.controller";
import { ReportRepository } from "../repositories/report.repository";

export default (main:Main)=>{

    const { router } = main
    //report egress
    const repositoryReport = new ReportRepository(main);
    const controllerReport = new ReportController(main,repositoryReport);
    router.get('/reports/egress',UserAutorization(main) ,Execute(controllerReport,'egressByDeposit'))
    router.get('/reports/ingress',UserAutorization(main) ,Execute(controllerReport,'ingressByDeposit'))
    router.get('/reports/resume',UserAutorization(main) ,Execute(controllerReport,'resume'))


}