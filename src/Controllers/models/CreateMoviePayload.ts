import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMoviePayload {
    @ApiProperty({ description: "Title", type: String })
    @IsNotEmpty()
    @IsString()
    public title: string;
}
