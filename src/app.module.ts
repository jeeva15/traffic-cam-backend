import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "./services/config/config.service";
import { SearchController } from "./controllers/search/search.controller";
import { SearchService } from "./services/search/search.service";
import { ExternalSearchService } from "./services/external-search/external.search.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    HttpModule
  ],
  controllers: [SearchController],
  providers: [SearchService, ExternalSearchService],
})
export class AppModule {}
