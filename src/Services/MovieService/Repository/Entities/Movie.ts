import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MovieData } from "../../contracts/MovieData";

@Entity()
export class Movie implements MovieData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    genre: string;

    @Column()
    released: string;

    @Column()
    createdAt: Date;

    @Column()
    director: string;

    @Column()
    userId: number;
}
