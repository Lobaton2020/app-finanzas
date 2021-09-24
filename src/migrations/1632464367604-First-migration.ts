import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1632464367604 implements MigrationInterface {
    name = 'FirstMigration1632464367604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`db_app_finanzas\`.\`documenttypes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`db_app_finanzas\`.\`rols\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` DROP COLUMN \`age\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` DROP COLUMN \`lastname\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` ADD \`numberDocument\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` ADD \`born_date\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` ADD \`completeName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` ADD \`status\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` ADD \`bornDate\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` ADD \`rolId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` ADD \`documentTypeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` ADD CONSTRAINT \`FK_ef236db52f60fbe1dc6b83efa8c\` FOREIGN KEY (\`rolId\`) REFERENCES \`db_app_finanzas\`.\`rols\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` ADD CONSTRAINT \`FK_8ba1eab72ad9e9c722e67d4a8db\` FOREIGN KEY (\`documentTypeId\`) REFERENCES \`db_app_finanzas\`.\`documenttypes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` DROP FOREIGN KEY \`FK_8ba1eab72ad9e9c722e67d4a8db\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` DROP FOREIGN KEY \`FK_ef236db52f60fbe1dc6b83efa8c\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` DROP COLUMN \`documentTypeId\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` DROP COLUMN \`rolId\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` DROP COLUMN \`bornDate\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` DROP COLUMN \`completeName\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` DROP COLUMN \`born_date\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` DROP COLUMN \`numberDocument\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` ADD \`lastname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` ADD \`age\` int NOT NULL`);
        await queryRunner.query(`DROP TABLE \`db_app_finanzas\`.\`rols\``);
        await queryRunner.query(`DROP TABLE \`db_app_finanzas\`.\`documenttypes\``);
    }

}
