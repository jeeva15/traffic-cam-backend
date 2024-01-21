import { HttpService } from "@nestjs/axios";
import { Injectable, Logger, ServiceUnavailableException } from "@nestjs/common";
import {  firstValueFrom } from "rxjs";
import { TRAFFIC_IMAGE_API, WEATHER_DATA_API } from "src/common/constants";
import { TrafficImagesItems, TrafficImagesResponse } from "src/interfaces/traffic.camera.response/traffic.camera.response.interface";
import { WeatherDataResponse } from "src/interfaces/weather.data.response/weather.data.response.interface";

@Injectable()
export class ExternalSearchService {
  private readonly logger = new Logger(ExternalSearchService.name);
  constructor(private readonly httpService: HttpService) {}

  async findTrafficImagesByDateTime(dateTime: string): Promise<TrafficImagesItems[]> {
    try{
      const { data } = await firstValueFrom(
        this.httpService
          .get<TrafficImagesResponse>(`${TRAFFIC_IMAGE_API}?data_time=${dateTime}`)
         
      );
      return data.items[0].cameras;
    }
    catch(error){
      Logger.error(error);
      throw new ServiceUnavailableException("An error occurs in Traffic camera API")
    }
    

   
  }

  async fetchWeatherData2Hours(date: string): Promise<WeatherDataResponse> {
    try{
    const { data } = await firstValueFrom(
      this.httpService
        .get<WeatherDataResponse>(`${WEATHER_DATA_API}?data=${date}`)
        
    );
    return data;
    }
    catch(error){
      Logger.error(error);
      throw new ServiceUnavailableException("An error occurs in Weather API")
    }
  }
}
