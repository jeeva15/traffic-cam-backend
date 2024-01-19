import { Controller, Get, UseFilters } from "@nestjs/common";
import { GlobalExceptionFilter } from "src/filters/global.exception/global.exception.filter";
import { UserService } from "../services/user.service";
import { UsersSearches } from "src/typeorm/entities/user.searches";

@Controller("api/user")
@UseFilters(new (GlobalExceptionFilter))
export class ControllersController {
  constructor(private readonly userServices: UserService) {}

  @Get("recent-search")
  async getRecentSearch(): Promise<UsersSearches[]> {
    return await this.userServices.getUsersRecentSearch();
  }
}
