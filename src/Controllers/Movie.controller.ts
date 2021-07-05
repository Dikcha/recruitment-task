import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus, Inject,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../Guards/JwtAuthGuard";
import { MovieService } from "../Services/MovieService/MovieService";
import { MoviePresentation } from "./models/MoviePresentation";
import { MovieMapper } from "./mappers/MovieMapper";
import { CreateMoviePayload } from "./models/CreateMoviePayload";
import { UserId } from "../decorators/UserId";
import { RoleGuard } from "../Guards/RoleGuard";
import { CONFIGS } from "../ioc.id";
import { Configs } from "../Configs";
const axios = require("axios");

@Controller()
@UsePipes(new ValidationPipe({ whitelist: true }))
@UseGuards(JwtAuthGuard)
@ApiTags("Movie")
@ApiBearerAuth("Authorization")
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Not authorized" })
export class MovieController {
    constructor (
        @Inject(CONFIGS) private readonly configs: Configs,
        private readonly movieService: MovieService,
        private readonly movieMapper: MovieMapper
    ) {}

    @Get("/movies")
    @ApiOperation({ description: "Get user movies list" })
    @ApiResponse({ status: HttpStatus.OK, description: "OK", type: [MoviePresentation] })
    public async getMovies (
        @UserId() userId: number
    ): Promise<MoviePresentation[]> {
        const movies = await this.movieService.getMovies(userId);

        return movies.map(m => this.movieMapper.mapMovieToPresentation(m));
    }

    @Post("/movies")
    @ApiOperation({ description: "Create a movie" })
    @UseGuards(RoleGuard)
    @ApiResponse({ status: HttpStatus.CREATED, description: "Created" })
    public async createMove (
        @Body() body: CreateMoviePayload,
        @UserId() userId: number
    ): Promise<void> {
        const request = {
            url: `http://www.omdbapi.com/?t=${body.title}&apikey=${this.configs.API_KEY}`,
        };
        let proxyResponse;

        try {
            proxyResponse = await axios(request);
        } catch (e) {
            throw new HttpException(
                e.message, e.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }

        if (!proxyResponse.data) {
            return;
        }

        const result = {
            title: proxyResponse.data.Title,
            released: proxyResponse.data.Year,
            genre: proxyResponse.data.Genre,
            director: proxyResponse.data.Director
        };

        await this.movieService.createMovie(userId, result);
    }
}
