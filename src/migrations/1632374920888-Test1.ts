import {MigrationInterface, QueryRunner} from "typeorm";

export class Test11632374920888 implements MigrationInterface {
    name = 'Test11632374920888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` ADD \`age\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`db_app_finanzas\`.\`users\` DROP COLUMN \`age\``);
    }

}
