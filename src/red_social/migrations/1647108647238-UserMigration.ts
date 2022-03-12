import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1647108647238 implements MigrationInterface {
    name = 'UserMigration1647108647238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`use_id\` int NOT NULL AUTO_INCREMENT, \`use_name\` varchar(30) NOT NULL, \`use_last_name\` varchar(30) NOT NULL, \`use_email\` varchar(60) NOT NULL, \`use_password\` varchar(64) NOT NULL, \`use_profile_image\` varchar(64) NOT NULL, \`use_birthday\` date NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`use_id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
