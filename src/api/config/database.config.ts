import IEnviroment from "./env.config";
import path from "path"
export default (env:IEnviroment) => ({
    type: env.DB_TYPE as any,
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DATABASE_NAME,
    entities: [
      path.resolve(__dirname,"../../../dist/api/**/*.entity.js"),
      path.resolve(__dirname,"../../../src/api/**/*.ts")
    ],
    autoLoadEntities: true,

    //Migraciones
    migrationsRun: true,
    // migrations: [join(__dirname, '../migration/**/*{.ts,.js}')],
    migrations: [
      path.resolve(__dirname,"../../../dist/migrations/*.js"),
      path.resolve(__dirname,"../../../src/migrations/*.ts"),
    ],
    migrationsTableName: 'migrations',
    cli: {
      migrationsDir: 'src/migrations/',
    },
    // 'synchronize' desactivar en produccion.
    synchronize: false,
    logging: true,
    logger: 'file',
  });