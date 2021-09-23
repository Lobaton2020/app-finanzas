import {MigrationInterface, QueryRunner} from "typeorm";

export class Test31632376312892 implements MigrationInterface {
    name = 'Test31632376312892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`db_app_finanzas\`.\`cars\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`model\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`db_app_finanzas\`.\`cars\``);
    }

}
