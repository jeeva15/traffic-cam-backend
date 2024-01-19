import { Controller, Get, Query, Req, UseFilters, ValidationPipe } from "@nestjs/common";
import { GlobalExceptionFilter } from "src/filters/global.exception/global.exception.filter";
import { SearchResponse } from "src/interfaces/search.response/search.response.interface";
import { TrafficImagesRequest } from "src/modules/search/dtos/traffic.images.dto";
import { WeatherForecastRequest } from "src/modules/search/dtos/weather.forecast.dto";
import { SearchService } from "src/modules/search/services/search/search.service";
import { decryptData } from "src/utils/utils";

@Controller("api/search")
@UseFilters(new (GlobalExceptionFilter))
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get("traffic-images")
  async findAllTrafficImagesByDateTime(
    @Query() query: TrafficImagesRequest
  ): Promise<SearchResponse[]> {
    return await this.searchService.findAllTrafficImagesByDateTime(
      decryptData(query.date_time)
    );
  }

  @Get("weather-forecast")
  async findWeatherDataByDate(
    @Query() query: WeatherForecastRequest
  ): Promise<string> {
    return await this.searchService.findWeatherData(
      decryptData(query.date_time),
      decryptData(query.location)
    );
  }
  
}
