import { CacheInterceptor } from "@nestjs/cache-manager";
import {
  Controller,
  Get,
  Query,
  Req,
  UseFilters,
  UseInterceptors,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { GlobalExceptionFilter } from "src/filters/global.exception/global.exception.filter";
import { SearchResponse } from "src/interfaces/search.response/search.response.interface";
import { TrafficImagesRequest } from "src/modules/search/dtos/traffic.images.dto";
import { WeatherForecastRequest } from "src/modules/search/dtos/weather.forecast.dto";
import { SearchService } from "src/modules/search/services/search/search.service";

@ApiTags('Search')
@Controller("api/search")
@UseFilters(new GlobalExceptionFilter())
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseInterceptors(CacheInterceptor)
  @Get("traffic-images")
  @ApiResponse({ status: 201, description: "Traffic Camera API", type: SearchResponse })
  async findAllTrafficImagesByDateTime(
    @Query() query: TrafficImagesRequest
  ): Promise<SearchResponse[]> {
    const { date_time } = query;
    return await this.searchService.findAllTrafficImagesByDateTime(date_time);
  }

  @UseInterceptors(CacheInterceptor)
  @Get("weather-forecast")
  @ApiResponse({ status: 201, description: "Weather Forcast API", type: String })
  async findWeatherDataByDate(
    @Query() query: WeatherForecastRequest
  ): Promise<string> {
    const { date_time, location } = query;
    return await this.searchService.findWeatherDataForLocation(date_time, location);
  }
}
