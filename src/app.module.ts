import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "./global-service/config-service/config.service";
import { SearchModule } from './modules/search/search.module';
import { AutheService } from './global-service/auth-service/auth.service';
import { AuthMiddleware } from "./middlewares/auth.middleware/auth.middleware";
import { UsersModule } from './modules/user/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    SearchModule,
    UsersModule
  ],
  controllers: [],
  providers: [AutheService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('api');
  }
}
