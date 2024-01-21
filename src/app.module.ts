import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "./global-service/config-service/config.service";
import { SearchModule } from "./modules/search/search.module";
import { AutheService } from "./global-service/auth-service/auth.service";
import { AuthMiddleware } from "./middlewares/auth.middleware/auth.middleware";
import { UsersModule } from "./modules/user/users.module";
import { SearchReportsModule } from "./modules/search-reports/search-reports.module";
import { Base64DecryptMiddleware } from "./middlewares/base64.decrypt.middleware/base64.decrypt.middleware";

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    SearchModule,
    UsersModule,
    SearchReportsModule,
  ],
  controllers: [],
  providers: [AutheService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, Base64DecryptMiddleware).forRoutes("api/search");
    consumer.apply(AuthMiddleware, Base64DecryptMiddleware).forRoutes("api/user");
  }
}
