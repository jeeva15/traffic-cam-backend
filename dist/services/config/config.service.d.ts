import { TypeOrmModuleOptions } from "@nestjs/typeorm";
declare class ConfigService {
    private env;
    constructor(env: {
        [k: string]: string | undefined;
    });
    private getValue;
    getTypeOrmConfig(): TypeOrmModuleOptions;
}
declare const configService: ConfigService;
export { configService };
