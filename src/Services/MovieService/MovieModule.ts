import { Module } from "@nestjs/common";
import { MovieService } from "./MovieService";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Movie } from "./Repository/Entities/Movie";
import { MovieMapper } from "./mappers/MovieMapper";

@Module({
    imports: [TypeOrmModule.forFeature([Movie])],
    providers: [MovieService, MovieMapper],
    exports: [MovieService]
})
export class MovieModule {}
