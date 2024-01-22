import { Controller, Get, UseFilters } from "@nestjs/common";
import { GlobalExceptionFilter } from "src/filters/global.exception/global.exception.filter";
import { UserService } from "../services/user.service";
import { UsersSearches } from "src/typeorm/entities/user.searches";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller("api/user")
@UseFilters(new (GlobalExceptionFilter))
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @Get("user-recent-search")
  @ApiResponse({ status: 201, description: "Recent Search by User", type: UsersSearches })
  async getRecentSearchByUser(): Promise<UsersSearches[]> {
    return await this.userServices.getUsersRecentSearchByUser();
  }

  @Get("recent-search")
  @ApiResponse({ status: 201, description: "Recent Search by Others", type: UsersSearches })
  async getRecentSearch(): Promise<UsersSearches[]> {
    return await this.userServices.getUsersRecentSearchByOthers();
  }
}
