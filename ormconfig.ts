import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const config: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'red_social',
    entities: ['dist/src/**/*.entity.js'],
    synchronize: false,
    migrations: ['dist/src/red_social/migrations/*.js'],
    cli: {
        migrationsDir: 'src/red_social/migrations'
    }
}

export default config;