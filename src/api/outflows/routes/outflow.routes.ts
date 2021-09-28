import { UserAutorization } from '../../auth/middlewares/authorization-type';
import { Main } from '../../../lib/core/main/Main';
import { Execute } from '../../../lib/shared/main/Execute.function';
import { CategoryRepository } from '../repositories/category.repository';
import { CategoryController } from '../controllers/category.controller';
import { CategoryService } from '../services/category.service';
import { OutflowTypeRepository } from '../repositories/outflow-type.repository';
import { OutflowTypeService } from '../services/outflow-type.service';
import { OutflowTypeController } from '../controllers/outflow-type.controller';
import { OutflowRepository } from '../repositories/outflow.repository';
import { OutflowService } from '../services/outflow.service';
import { OutflowController } from '../controllers/outflow.controller';
import { ReportRepository } from '../../../api/reports/repositories/report.repository';

export default (main:Main)=>{

    //outflows
    const { router } = main;
    const repositoryOutflow = new OutflowRepository(main,new ReportRepository(main));
    const repositoryReport = new ReportRepository(main);
    const serviceOutflow = new OutflowService(repositoryOutflow, repositoryReport);
    const controllerOutflow = new OutflowController(main,serviceOutflow);
    router.get('/outflows', UserAutorization(main), Execute(controllerOutflow,'find'))
    router.post('/outflows',UserAutorization(main), Execute(controllerOutflow,'create'))

    //category
    const repositoryCategory = new CategoryRepository(main);
    const repositoryService = new CategoryService(repositoryCategory);
    const controllerCategory = new CategoryController(main,repositoryService);
    router.get('/outflows/categories',UserAutorization(main) ,Execute(controllerCategory,'find'))
    router.post('/outflows/categories',UserAutorization(main) ,Execute(controllerCategory,'create'))

     //inflow type
     const repositoryOutflowType = new OutflowTypeRepository(main);
     const serviceOutflowType = new OutflowTypeService(repositoryOutflowType);
     const controllerOutflowType = new OutflowTypeController(main,serviceOutflowType);
     router.get('/outflows/types',UserAutorization(main) ,Execute(controllerOutflowType,'find'))
     router.post('/outflows/types',UserAutorization(main) ,Execute(controllerOutflowType,'create'))

};