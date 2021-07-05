import { Module } from "@nestjs/common";
import { AuthorizationService } from "./AuthorizationService";
import { CONFIGS } from "../../ioc.id";
import { loadConfigs } from "../../Configs";

@Module({
    providers: [
        AuthorizationService,
        {
            provide: CONFIGS,
            useValue: loadConfigs()
        },
    ],
    exports: [AuthorizationService]
})
export class AuthorizationModule {}
