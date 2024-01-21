import { Controller, Get, Query } from "@nestjs/common";
import { ReportsService } from "../services/reports.service";
import { UsersSearches } from "src/typeorm/entities/user.searches";
import { TopSearchRequest } from "../dtos/top.search.dtos";
import { reverseDateFormat } from "src/utils/utils";
import { DateValidationPipe } from "src/pipes/date.validation.pipes";
import { MostSearchesReponse } from "src/interfaces/search.report.response/search.report.response";

@Controller("search-reports")
export class ReportsController {
  constructor(private readonly reportServices: ReportsService) {}

  @Get("most-recent-search")
  async getRecentSearchByUser(): Promise<UsersSearches[]> {
    return await this.reportServices.getMostRecentSearchesByAllUsers();
  }

  @Get("top-searches")
  async getTop10SearchesByDate(
    @Query("date", new DateValidationPipe()) dateInput: string
  ): Promise<UsersSearches[]> {
    const date = reverseDateFormat(dateInput);
    return await this.reportServices.getTop10SearchesByDate(date);
  }

  @Get("most-searches")
  async getMostSearchesByDate(
    @Query("date", new DateValidationPipe()) dateInput: string
  ): Promise<MostSearchesReponse> {
    const date = reverseDateFormat(dateInput);
    return await this.reportServices.getTopSearchesOfTheDay(date);
  }
}
