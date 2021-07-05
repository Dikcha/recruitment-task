import { IMovieService } from "./contracts/IMovieService";
import { Movie } from "./contracts/Movie";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Movie as MovieRepository } from "./Repository/Entities/Movie";
import { Between, Repository } from "typeorm";
import { MovieMapper } from "./mappers/MovieMapper";

@Injectable()
export class MovieService implements IMovieService {
    constructor (
        @InjectRepository(MovieRepository)
        private readonly movieRepository: Repository<MovieRepository>,
        private readonly movieMapper: MovieMapper
    ) {}

    public async createMovie (userId: number, movie: Movie): Promise<void> {
        const data = this.movieMapper.mapMovieContractToData(userId, movie);

        await this.movieRepository.insert(data);
    }

    public async getMovies (userId: number): Promise<Movie[]> {
        const movies = await this.movieRepository.find({ userId });

        return movies.map(m => this.movieMapper.mapMovieDataToContract(m));
    }

    public async countUserMoviesPerMonth (userId: number): Promise<number> {
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        return this.movieRepository.count({
            where: {
                createdAt: Between(
                    new Date(firstDay).toISOString(),
                    new Date(lastDay).toISOString()
                ),
                userId
            },
            skip: 0,
            take: 5
        });
    }
}
