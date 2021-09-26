import {MigrationInterface, QueryRunner} from "typeorm";

export class Database1632635541094 implements MigrationInterface {
    name = 'Database1632635541094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`db_app_finanzas\`.\`documenttypes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`db_app_finanzas\`.\`rols\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e2eca4b07b643a471c3683994d\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`db_app_finanzas\`.\`inflowtypes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_ab1e506e81226fc014bd1bee37\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`db_app_finanzas\`.\`inflows\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`total\` float NOT NULL, \`description\` mediumtext NOT NULL, \`setDate\` timestamp NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`userId\` int NOT NULL, \`inflowtypeId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`db_app_finanzas\`.\`inflow_porcent\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`porcentNumber\` bigint NOT NULL, \`porcentId\` int NOT NULL, \`inflowId\` int NOT NULL, UNIQUE INDEX \`IDX_d89f108db4f184bd5bd3cb38a9\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`db_app_finanzas\`.\`procents\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`usersId\` int NULL, UNIQUE INDEX \`IDX_fc4181be9c36e570dbb0aeae36\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`db_app_finanzas\`.\`outflows\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`amount\` float NOT NULL, \`description\` mediumtext NOT NULL, \`setDate\` timestamp NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`categoryId\` int NOT NULL, \`userId\` int NOT NULL, \`outflowtypeId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`db_app_finanzas\`.\`outflowtypes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_3fe70a739c090b3cdc78b93d6c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`db_app_finanzas\`.\`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`userId\` int NOT NULL, \`outflowtypeId\` int NOT NULL, UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`db_app_finanzas\`.\`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`documentNumber\` varchar(255) NOT NULL, \`completeName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`image\` varchar(255) NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`bornDate\` timestamp NOT NULL, \`rolId\` int NOT NULL, \`documentTypeId\` int NOT NULL, UNIQUE INDEX \`IDX_9919ce10860709c1f0f115062b\` (\`documentNumber\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`inflows\` ADD CONSTRAINT \`FK_5b94072b2f4d1475cea27c24067\` FOREIGN KEY (\`userId\`) REFERENCES \`db_app_finanzas\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`inflows\` ADD CONSTRAINT \`FK_aa8ccd4c5bb9c2b4983bfa7e2f3\` FOREIGN KEY (\`inflowtypeId\`) REFERENCES \`db_app_finanzas\`.\`inflowtypes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`inflow_porcent\` ADD CONSTRAINT \`FK_97a9bc4cca3bcf7795aa110d9e5\` FOREIGN KEY (\`porcentId\`) REFERENCES \`db_app_finanzas\`.\`procents\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`inflow_porcent\` ADD CONSTRAINT \`FK_7642051ebd233306cbba26b8fd1\` FOREIGN KEY (\`inflowId\`) REFERENCES \`db_app_finanzas\`.\`procents\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`procents\` ADD CONSTRAINT \`FK_abe48ed42a87bd67e928343245f\` FOREIGN KEY (\`usersId\`) REFERENCES \`db_app_finanzas\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`outflows\` ADD CONSTRAINT \`FK_fe4362018d3493ab3685a18a2a5\` FOREIGN KEY (\`categoryId\`) REFERENCES \`db_app_finanzas\`.\`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`outflows\` ADD CONSTRAINT \`FK_a13c00396991e4ffd06a0ba9a0d\` FOREIGN KEY (\`userId\`) REFERENCES \`db_app_finanzas\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`outflows\` ADD CONSTRAINT \`FK_1b8fbc7b64f831be38c2acf9989\` FOREIGN KEY (\`outflowtypeId\`) REFERENCES \`db_app_finanzas\`.\`outflowtypes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`categories\` ADD CONSTRAINT \`FK_13e8b2a21988bec6fdcbb1fa741\` FOREIGN KEY (\`userId\`) REFERENCES \`db_app_finanzas\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`categories\` ADD CONSTRAINT \`FK_e6c4f4f70107d40268c3ba4eaf4\` FOREIGN KEY (\`outflowtypeId\`) REFERENCES \`db_app_finanzas\`.\`outflowtypes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` ADD CONSTRAINT \`FK_ef236db52f60fbe1dc6b83efa8c\` FOREIGN KEY (\`rolId\`) REFERENCES \`db_app_finanzas\`.\`rols\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` ADD CONSTRAINT \`FK_8ba1eab72ad9e9c722e67d4a8db\` FOREIGN KEY (\`documentTypeId\`) REFERENCES \`db_app_finanzas\`.\`documenttypes\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` DROP FOREIGN KEY \`FK_8ba1eab72ad9e9c722e67d4a8db\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` DROP FOREIGN KEY \`FK_ef236db52f60fbe1dc6b83efa8c\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`categories\` DROP FOREIGN KEY \`FK_e6c4f4f70107d40268c3ba4eaf4\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`categories\` DROP FOREIGN KEY \`FK_13e8b2a21988bec6fdcbb1fa741\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`outflows\` DROP FOREIGN KEY \`FK_1b8fbc7b64f831be38c2acf9989\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`outflows\` DROP FOREIGN KEY \`FK_a13c00396991e4ffd06a0ba9a0d\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`outflows\` DROP FOREIGN KEY \`FK_fe4362018d3493ab3685a18a2a5\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`procents\` DROP FOREIGN KEY \`FK_abe48ed42a87bd67e928343245f\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`inflow_porcent\` DROP FOREIGN KEY \`FK_7642051ebd233306cbba26b8fd1\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`inflow_porcent\` DROP FOREIGN KEY \`FK_97a9bc4cca3bcf7795aa110d9e5\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`inflows\` DROP FOREIGN KEY \`FK_aa8ccd4c5bb9c2b4983bfa7e2f3\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`inflows\` DROP FOREIGN KEY \`FK_5b94072b2f4d1475cea27c24067\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`db_app_finanzas\`.\`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_9919ce10860709c1f0f115062b\` ON \`db_app_finanzas\`.\`users\``);
        await queryRunner.query(`DROP TABLE \`db_app_finanzas\`.\`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`db_app_finanzas\`.\`categories\``);
        await queryRunner.query(`DROP TABLE \`db_app_finanzas\`.\`categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_3fe70a739c090b3cdc78b93d6c\` ON \`db_app_finanzas\`.\`outflowtypes\``);
        await queryRunner.query(`DROP TABLE \`db_app_finanzas\`.\`outflowtypes\``);
        await queryRunner.query(`DROP TABLE \`db_app_finanzas\`.\`outflows\``);
        await queryRunner.query(`DROP INDEX \`IDX_fc4181be9c36e570dbb0aeae36\` ON \`db_app_finanzas\`.\`procents\``);
        await queryRunner.query(`DROP TABLE \`db_app_finanzas\`.\`procents\``);
        await queryRunner.query(`DROP INDEX \`IDX_d89f108db4f184bd5bd3cb38a9\` ON \`db_app_finanzas\`.\`inflow_porcent\``);
        await queryRunner.query(`DROP TABLE \`db_app_finanzas\`.\`inflow_porcent\``);
        await queryRunner.query(`DROP TABLE \`db_app_finanzas\`.\`inflows\``);
        await queryRunner.query(`DROP INDEX \`IDX_ab1e506e81226fc014bd1bee37\` ON \`db_app_finanzas\`.\`inflowtypes\``);
        await queryRunner.query(`DROP TABLE \`db_app_finanzas\`.\`inflowtypes\``);
        await queryRunner.query(`DROP INDEX \`IDX_e2eca4b07b643a471c3683994d\` ON \`db_app_finanzas\`.\`rols\``);
        await queryRunner.query(`DROP TABLE \`db_app_finanzas\`.\`rols\``);
        await queryRunner.query(`DROP TABLE \`db_app_finanzas\`.\`documenttypes\``);
    }

}
