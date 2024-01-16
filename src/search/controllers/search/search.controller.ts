import { Controller, Get, Param, Query, Req } from "@nestjs/common";
import { USER_ID_COOKIE_NAME } from "src/common/constants";
import { SearchResponse } from "src/interfaces/search.response/search.response.interface";
import { TrafficCameraItems } from "src/interfaces/traffic.camera.response/traffic.camera.response.interface";
import { SearchService } from "src/search/services/search/search.service";

@Controller("api/search")
export class SearchController {
constructor(private readonly searchService: SearchService) {}

  @Get('traffic-cameras')
  async findAllTrafficCamerasByDateTime(@Query() query: any, @Req() request:any): Promise<SearchResponse[]> {
    return await this.searchService.findAllCamerasImagesByDateTime(query.date_time, request.cookies[USER_ID_COOKIE_NAME]);
  }

  @Get('weather')
  async findWeatherDataByDate(@Query() date: string): Promise<any> {
    return await this.searchService.findWeatherData(date);
  }
}
