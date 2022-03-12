import {MigrationInterface, QueryRunner} from "typeorm";

export class PostAndCommentMigration1647116278077 implements MigrationInterface {
    name = 'PostAndCommentMigration1647116278077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comment\` (\`com_id\` int NOT NULL AUTO_INCREMENT, \`com_description\` varchar(256) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), \`comUseIdUseId\` int NULL, \`comPosIdPosId\` int NULL, PRIMARY KEY (\`com_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`use_id\` int NOT NULL AUTO_INCREMENT, \`use_name\` varchar(30) NOT NULL, \`use_last_name\` varchar(30) NOT NULL, \`use_email\` varchar(60) NOT NULL, \`use_password\` varchar(64) NOT NULL, \`use_profile_image\` varchar(64) NOT NULL, \`use_birthday\` date NOT NULL, \`use_description\` varchar(256) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`use_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post\` (\`pos_id\` int NOT NULL AUTO_INCREMENT, \`pos_description\` varchar(256) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), \`posUseIdUseId\` int NULL, PRIMARY KEY (\`pos_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_cdec999532afdec852793896e19\` FOREIGN KEY (\`comUseIdUseId\`) REFERENCES \`user\`(\`use_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_298e414ad2c072bfa492213ad40\` FOREIGN KEY (\`comPosIdPosId\`) REFERENCES \`post\`(\`pos_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_80cc7f0110be18e751eb59aae12\` FOREIGN KEY (\`posUseIdUseId\`) REFERENCES \`user\`(\`use_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_80cc7f0110be18e751eb59aae12\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_298e414ad2c072bfa492213ad40\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_cdec999532afdec852793896e19\``);
        await queryRunner.query(`DROP TABLE \`post\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
    }

}
