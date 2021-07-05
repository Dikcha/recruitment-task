import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthPayload {
    @ApiProperty({ description: "User name", type: String })
    @IsNotEmpty()
    @IsString()
    public username: string;

    @ApiProperty({ description: "User password", type: String })
    @IsNotEmpty()
    @IsString()
    public password: string;
}
