import { Module } from "@nestjs/common";
import { SearchController } from "./controllers/search/search.controller";
import { SearchService } from "./services/search/search.service";
import { ExternalSearchService } from "./services/external-search/external.search.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersSearches } from "../typeorm/entities/user.searches";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [TypeOrmModule.forFeature([UsersSearches]), HttpModule],
  controllers: [SearchController],
  providers: [SearchService, ExternalSearchService],
})
export class SearchModule {}
