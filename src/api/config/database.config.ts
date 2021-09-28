import IEnviroment from "./env.config";
import path from "path"
import { Deposit } from "../inflows/entities/Deposit.entity";
import { InflowDeposit } from "../inflows/entities/InflowDeposit.entity";
import { Inflow } from "../inflows/entities/Intflow.entity";
import { InflowType } from "../inflows/entities/IntflowType.entity";
import { Category } from "../outflows/entities/Category.entity";
import { Outflow } from "../outflows/entities/Outflow.entity";
import { OutflowType } from "../outflows/entities/OutflowType.entity";
import { DocumentType } from "../users/entities/DocumentType.entity";
import { Rol } from "../users/entities/Rol.entity";
import { User } from "../users/entities/User.entity";
import { Traceability } from "../admin/entities/Traceability.entity";

export default (env:IEnviroment) => ({
    type: env.DB_TYPE as any,
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DATABASE_NAME,
    entities: [
      Deposit,
      InflowDeposit,
      Inflow,
      InflowType,
      Category,
      Outflow,
      OutflowType,
      DocumentType,
      Rol,
      User,
      Traceability
    ],
    autoLoadEntities: true,

    //Migraciones
    migrationsRun: false,
    // migrations: [join(__dirname, '../migration/**/*{.ts,.js}')],
    migrations: [
      process.env.TYPE == "PROD" ?
      path.resolve(__dirname,"../../../dist/migrations/*.js"):
      path.resolve(__dirname,"../../../src/migrations/*.ts")
    ],
    migrationsTableName: 'migrations',
    cli: {
      migrationsDir: 'src/migrations/',
    },
    // 'synchronize' desactivar en produccion.
    synchronize: false,
    logging: false,
    // logger: 'file',
  });
