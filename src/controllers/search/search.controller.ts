import { Controller, Get, Param, Query } from "@nestjs/common";
import { TrafficCameraItems } from "src/interfaces/traffic.camera.response/traffic.camera.response.interface";
import { SearchService } from "src/services/search/search.service";

@Controller("search")
export class SearchController {
constructor(private readonly searchService: SearchService) {}

  @Get('traffic-cameras')
  async findAllTrafficCamerasByDateTime(@Query() date_time: string): Promise<TrafficCameraItems[]> {
    return await this.searchService.findAllCamerasByDateTime(date_time);
  }
}
