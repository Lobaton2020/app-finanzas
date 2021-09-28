import {MigrationInterface, QueryRunner} from "typeorm";

export class Database1632797566647 implements MigrationInterface {
    name = 'Database1632797566647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`appfinanzasprod\`.\`documenttypes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`appfinanzasprod\`.\`rols\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e2eca4b07b643a471c3683994d\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`appfinanzasprod\`.\`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`userId\` int NOT NULL, \`outflowtypeId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`appfinanzasprod\`.\`outflowtypes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`appfinanzasprod\`.\`outflows\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`amount\` float NOT NULL, \`description\` mediumtext NULL, \`setDate\` timestamp NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`categoryId\` int NULL, \`userId\` int NOT NULL, \`depositId\` int NOT NULL, \`outflowtypeId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`appfinanzasprod\`.\`inflowtypes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`appfinanzasprod\`.\`inflows\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`total\` float NOT NULL, \`description\` mediumtext NULL, \`setDate\` timestamp NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`userId\` int NOT NULL, \`inflowtypeId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`appfinanzasprod\`.\`inflow_deposit\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`status\` tinyint NOT NULL DEFAULT 1, \`porcentNumber\` bigint NOT NULL, \`depositId\` int NOT NULL, \`inflowId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`appfinanzasprod\`.\`deposits\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`appfinanzasprod\`.\`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`documentNumber\` varchar(255) NOT NULL, \`completeName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`image\` varchar(255) NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`bornDate\` timestamp NOT NULL, \`emailVerifyDate\` varchar(255) NULL, \`recoveryPasswordToken\` varchar(255) NULL, \`rememberToken\` varchar(255) NULL, \`rolId\` int NOT NULL, \`documentTypeId\` int NOT NULL, UNIQUE INDEX \`IDX_9919ce10860709c1f0f115062b\` (\`documentNumber\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`appfinanzasprod\`.\`traceabilities\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`agent\` json NOT NULL, \`clientIp\` varchar(255) NOT NULL, \`requestId\` varchar(255) NOT NULL, \`endpoint\` varchar(255) NOT NULL, \`httpMethod\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`categories\` ADD CONSTRAINT \`FK_13e8b2a21988bec6fdcbb1fa741\` FOREIGN KEY (\`userId\`) REFERENCES \`appfinanzasprod\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`categories\` ADD CONSTRAINT \`FK_e6c4f4f70107d40268c3ba4eaf4\` FOREIGN KEY (\`outflowtypeId\`) REFERENCES \`appfinanzasprod\`.\`outflowtypes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`outflowtypes\` ADD CONSTRAINT \`FK_5398bbad75411cbd0a38306d912\` FOREIGN KEY (\`userId\`) REFERENCES \`appfinanzasprod\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`outflows\` ADD CONSTRAINT \`FK_fe4362018d3493ab3685a18a2a5\` FOREIGN KEY (\`categoryId\`) REFERENCES \`appfinanzasprod\`.\`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`outflows\` ADD CONSTRAINT \`FK_a13c00396991e4ffd06a0ba9a0d\` FOREIGN KEY (\`userId\`) REFERENCES \`appfinanzasprod\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`outflows\` ADD CONSTRAINT \`FK_ba6dd872d180d5396b6ae73c4f1\` FOREIGN KEY (\`depositId\`) REFERENCES \`appfinanzasprod\`.\`deposits\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`outflows\` ADD CONSTRAINT \`FK_1b8fbc7b64f831be38c2acf9989\` FOREIGN KEY (\`outflowtypeId\`) REFERENCES \`appfinanzasprod\`.\`outflowtypes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`inflowtypes\` ADD CONSTRAINT \`FK_f1376e4ec8651cdf9d7291fd690\` FOREIGN KEY (\`userId\`) REFERENCES \`appfinanzasprod\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`inflows\` ADD CONSTRAINT \`FK_5b94072b2f4d1475cea27c24067\` FOREIGN KEY (\`userId\`) REFERENCES \`appfinanzasprod\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`inflows\` ADD CONSTRAINT \`FK_aa8ccd4c5bb9c2b4983bfa7e2f3\` FOREIGN KEY (\`inflowtypeId\`) REFERENCES \`appfinanzasprod\`.\`inflowtypes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`inflow_deposit\` ADD CONSTRAINT \`FK_3d684019eb86574796bfaed507d\` FOREIGN KEY (\`depositId\`) REFERENCES \`appfinanzasprod\`.\`deposits\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`inflow_deposit\` ADD CONSTRAINT \`FK_7ad691e891b6ad32c3ae5233ef1\` FOREIGN KEY (\`inflowId\`) REFERENCES \`appfinanzasprod\`.\`inflows\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`deposits\` ADD CONSTRAINT \`FK_968bcd26d29022f95d20bb70e21\` FOREIGN KEY (\`userId\`) REFERENCES \`appfinanzasprod\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`users\` ADD CONSTRAINT \`FK_ef236db52f60fbe1dc6b83efa8c\` FOREIGN KEY (\`rolId\`) REFERENCES \`appfinanzasprod\`.\`rols\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`users\` ADD CONSTRAINT \`FK_8ba1eab72ad9e9c722e67d4a8db\` FOREIGN KEY (\`documentTypeId\`) REFERENCES \`appfinanzasprod\`.\`documenttypes\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`traceabilities\` ADD CONSTRAINT \`FK_5f3a06eb4e41c20517e5c9aa8c9\` FOREIGN KEY (\`userId\`) REFERENCES \`appfinanzasprod\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`traceabilities\` DROP FOREIGN KEY \`FK_5f3a06eb4e41c20517e5c9aa8c9\``);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`users\` DROP FOREIGN KEY \`FK_8ba1eab72ad9e9c722e67d4a8db\``);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`users\` DROP FOREIGN KEY \`FK_ef236db52f60fbe1dc6b83efa8c\``);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`deposits\` DROP FOREIGN KEY \`FK_968bcd26d29022f95d20bb70e21\``);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`inflow_deposit\` DROP FOREIGN KEY \`FK_7ad691e891b6ad32c3ae5233ef1\``);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`inflow_deposit\` DROP FOREIGN KEY \`FK_3d684019eb86574796bfaed507d\``);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`inflows\` DROP FOREIGN KEY \`FK_aa8ccd4c5bb9c2b4983bfa7e2f3\``);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`inflows\` DROP FOREIGN KEY \`FK_5b94072b2f4d1475cea27c24067\``);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`inflowtypes\` DROP FOREIGN KEY \`FK_f1376e4ec8651cdf9d7291fd690\``);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`outflows\` DROP FOREIGN KEY \`FK_1b8fbc7b64f831be38c2acf9989\``);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`outflows\` DROP FOREIGN KEY \`FK_ba6dd872d180d5396b6ae73c4f1\``);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`outflows\` DROP FOREIGN KEY \`FK_a13c00396991e4ffd06a0ba9a0d\``);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`outflows\` DROP FOREIGN KEY \`FK_fe4362018d3493ab3685a18a2a5\``);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`outflowtypes\` DROP FOREIGN KEY \`FK_5398bbad75411cbd0a38306d912\``);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`categories\` DROP FOREIGN KEY \`FK_e6c4f4f70107d40268c3ba4eaf4\``);
        await queryRunner.query(`ALTER TABLE \`appfinanzasprod\`.\`categories\` DROP FOREIGN KEY \`FK_13e8b2a21988bec6fdcbb1fa741\``);
        await queryRunner.query(`DROP TABLE \`appfinanzasprod\`.\`traceabilities\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`appfinanzasprod\`.\`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_9919ce10860709c1f0f115062b\` ON \`appfinanzasprod\`.\`users\``);
        await queryRunner.query(`DROP TABLE \`appfinanzasprod\`.\`users\``);
        await queryRunner.query(`DROP TABLE \`appfinanzasprod\`.\`deposits\``);
        await queryRunner.query(`DROP TABLE \`appfinanzasprod\`.\`inflow_deposit\``);
        await queryRunner.query(`DROP TABLE \`appfinanzasprod\`.\`inflows\``);
        await queryRunner.query(`DROP TABLE \`appfinanzasprod\`.\`inflowtypes\``);
        await queryRunner.query(`DROP TABLE \`appfinanzasprod\`.\`outflows\``);
        await queryRunner.query(`DROP TABLE \`appfinanzasprod\`.\`outflowtypes\``);
        await queryRunner.query(`DROP TABLE \`appfinanzasprod\`.\`categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_e2eca4b07b643a471c3683994d\` ON \`appfinanzasprod\`.\`rols\``);
        await queryRunner.query(`DROP TABLE \`appfinanzasprod\`.\`rols\``);
        await queryRunner.query(`DROP TABLE \`appfinanzasprod\`.\`documenttypes\``);
    }

}
