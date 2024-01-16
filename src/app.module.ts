import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "./search/services/config/config.service";
import { SearchController } from "./search/controllers/search/search.controller";
import { SearchService } from "./search/services/search/search.service";
import { ExternalSearchService } from "./search/services/external-search/external.search.service";
import { HttpModule } from "@nestjs/axios";
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    SearchModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
