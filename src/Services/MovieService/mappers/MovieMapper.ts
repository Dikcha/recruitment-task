import { Movie } from "../contracts/Movie";
import { MovieData } from "../contracts/MovieData";

export class MovieMapper {
    public mapMovieDataToContract (movie: MovieData): Movie {
        return {
            title: movie.title,
            released: movie.released,
            director: movie.director,
            genre: movie.genre
        };
    }

    public mapMovieContractToData (userId: number, movie: Movie): MovieData {
        return {
            id: null,
            userId,
            title: movie.title,
            released: new Date(movie.released).getFullYear().toString(),
            director: movie.director,
            genre: movie.genre,
            createdAt: new Date()
        };
    }
}
