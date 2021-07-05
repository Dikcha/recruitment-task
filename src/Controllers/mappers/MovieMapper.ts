import { Movie } from "../../Services/MovieService/contracts/Movie";
import { MoviePresentation } from "../models/MoviePresentation";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MovieMapper {
    public mapMovieToPresentation (movie: Movie): MoviePresentation {
        return {
            director: movie.director,
            title: movie.title,
            released: movie.released,
            genre: movie.genre
        };
    }
}
