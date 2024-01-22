import { Controller, Get, Query } from "@nestjs/common";
import { ReportsService } from "../services/reports.service";
import { UsersSearches } from "src/typeorm/entities/user.searches";
import { TopSearchRequest } from "../dtos/top.search.dtos";
import { reverseDateFormat } from "src/utils/utils";
import { DateValidationPipe } from "src/pipes/date.validation.pipes";
import { MostSearchesReponse } from "src/interfaces/search.report.response/search.report.response";
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Reports')
@Controller("search-reports")
export class ReportsController {
  constructor(private readonly reportServices: ReportsService) {}

  @Get("most-recent-search")
  @ApiResponse({ status: 201, description: "Most recent 10 DateTime + Location searched by all user", type: UsersSearches })
  async getRecentSearchByUser(): Promise<UsersSearches[]> {
    return await this.reportServices.getMostRecentSearchesByAllUsers();
  }

  @Get("top-searches")
  @ApiQuery({ name:'date', description:'20/01/2024', required: true,  type: String})
  @ApiResponse({ status: 201, description: "Top 10 DateTime + Location within a period", type: UsersSearches })
  async getTop10SearchesByDate(
    @Query("date", new DateValidationPipe()) dateInput: string
  ): Promise<UsersSearches[]> {
    const date = reverseDateFormat(dateInput);
    return await this.reportServices.getTop10SearchesByDate(date);
  }

  @Get("most-searches")
  @ApiQuery({ name:'date', description:'20/01/2024', required: true,  type: String})
  @ApiResponse({ status: 201, description: "Top 10 DateTime + Location within a period", type: MostSearchesReponse })
  async getMostSearchesByDate(
    @Query("date", new DateValidationPipe()) dateInput: string
  ): Promise<MostSearchesReponse> {
    const date = reverseDateFormat(dateInput);
    return await this.reportServices.getTopSearchesOfTheDay(date);
  }
}
