import { Module } from "@nestjs/common";
import { LocalStrategy } from "./Strategies/LocalStrategy";
import { AuthorizationModule } from "./Services/AuthorizationService/AuthorizationModule";
import { MovieModule } from "./Services/MovieService/MovieModule";
import { JwtStrategy } from "./Strategies/JwtStrategy";
import { JwtModule } from "@nestjs/jwt";
import { MovieMapper } from "./Controllers/mappers/MovieMapper";
import { MovieController } from "./Controllers/Movie.controller";
import { AuthorizationController } from "./Controllers/Authorization.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import path from "path";
import { loadConfigs } from "./Configs";
import { CONFIGS } from "./ioc.id";

export const configs = loadConfigs();

@Module({
    controllers: [
        AuthorizationController,
        MovieController
    ],
    imports: [
        AuthorizationModule,
        MovieModule,
        JwtModule.register({
            secret: configs.JWT_SECRET,
            signOptions: { expiresIn: 30 * 60 },
        }),
        //TODO use forRootAsync and Configuration.ts file
        TypeOrmModule.forRoot({
            type: "mysql",
            host: configs.MYSQL_HOST,
            port: 3306,
            username: configs.MYSQL_USERNAME,
            password: configs.MYSQL_ROOT_PASSWORD,
            database: configs.MYSQL_DATABASE,
            autoLoadEntities: true,
            retryAttempts: 15,
            retryDelay: 5000,
            migrations: [path.normalize("lib/migrations/*.js")],
            migrationsRun: true,
            cli: {
                "migrationsDir": "migrations"
            }
        }),
    ],
    providers: [
        LocalStrategy,
        MovieMapper,
        {
            provide: CONFIGS,
            useValue: configs
        },
        {
            provide: JwtStrategy,
            useFactory: () => new JwtStrategy(configs.JWT_SECRET),
        },
    ]
})
export class RootModule {}
