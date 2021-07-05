import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class MovieTable1625345933821 implements MigrationInterface {
    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "movie",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"

                },
                {
                    name: "title",
                    type: "varchar(255)"
                },
                {
                    name: "released",
                    type: "varchar(255)"
                },
                {
                    name: "createdAt",
                    type: "date"
                },
                {
                    name: "genre",
                    type: "varchar(255)"
                },
                {
                    name: "director",
                    type: "varchar(255)"
                },
                {
                    name: "userId",
                    type: "int"
                }
            ]
        }), true);
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("movie");
    }

}
