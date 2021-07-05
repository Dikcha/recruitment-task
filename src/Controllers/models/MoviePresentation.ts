import { ApiProperty } from "@nestjs/swagger";


export class MoviePresentation {
    @ApiProperty({ type: String })
    public title: string;
    @ApiProperty({ type: String })
    public released: string;
    @ApiProperty({ type: String })
    public genre: string;
    @ApiProperty({ type: String })
    public director: string;
}
