require("dotenv").config({ path: __dirname + "/../.env" });

import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestFactory } from "@nestjs/core";
import { RootModule } from "./RootModule";
import { ErrorExceptionFilter } from "./Filters/ErrorExceptionFilter";
import { CONFIGS } from "./ioc.id";

async function bootstrap (): Promise<void> {
    const app = await NestFactory.create(RootModule);

    app.useGlobalFilters(new ErrorExceptionFilter());
    addSwaggerDocumentation(app);

    await app.listen(app.get(CONFIGS).APP_PORT);
}

function addSwaggerDocumentation (app: INestApplication) {
    const apiOptions = new DocumentBuilder()
        .setTitle("Recruitment task API Documentation")
        .setDescription("Application API")
        .setVersion("1.0")
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: "JWT" }, "Authorization")
        .build();

    const document = SwaggerModule.createDocument(app, apiOptions);
    SwaggerModule.setup("/api/docs", app, document);
}


bootstrap().catch((err) => {
    console.error(err);
    process.exit(-1);
});

