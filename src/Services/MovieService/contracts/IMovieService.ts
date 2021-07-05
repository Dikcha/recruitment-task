import { Movie } from "./Movie";

export interface IMovieService {
    createMovie (userId: number, movie: Movie): Promise<void>;
    getMovies (userId: number): Promise<Movie[]>;
    countUserMoviesPerMonth (userId: number): Promise<number>;
}
