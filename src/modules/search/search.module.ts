import { Module } from "@nestjs/common";
import { SearchController } from "./controllers/search/search.controller";
import { SearchService } from "./services/search/search.service";
import { ExternalSearchService } from "./services/external-search/external.search.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersSearches } from "../../typeorm/entities/user.searches";
import { HttpModule } from "@nestjs/axios";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [TypeOrmModule.forFeature([UsersSearches]), HttpModule, CacheModule.register({
    ttl: 60 * 60, // 1hr
    max: 10, // maximum number of items in cache
  })],
  controllers: [SearchController],
  providers: [SearchService, ExternalSearchService],
})
export class SearchModule {}
