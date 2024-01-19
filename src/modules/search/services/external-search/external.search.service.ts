import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { TRAFFIC_IMAGE_API, WEATHER_DATA_API } from "src/common/constants";
import { TrafficImagesItems, TrafficImagesResponse } from "src/interfaces/traffic.camera.response/traffic.camera.response.interface";
import { WeatherDataResponse } from "src/interfaces/weather.data.response/weather.data.response.interface";

@Injectable()
export class ExternalSearchService {
  private readonly logger = new Logger(ExternalSearchService.name);
  constructor(private readonly httpService: HttpService) {}

  async findTrafficImagesByDateTime(dateTime: string): Promise<TrafficImagesItems[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<TrafficImagesResponse>(`${TRAFFIC_IMAGE_API}?data_time=${dateTime}`)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data);
            throw "An error happened!";
          })
        )
    );

    return data.items[0].cameras;
  }

  async fetchWeatherData2Hours(date: string): Promise<WeatherDataResponse> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<WeatherDataResponse>(`${WEATHER_DATA_API}?data=${date}`)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data);
            throw "An error happened!";
          })
        )
    );
    return data;
  }
}
