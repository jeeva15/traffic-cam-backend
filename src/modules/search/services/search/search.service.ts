import { Injectable } from "@nestjs/common";
import { ExternalSearchService } from "../external-search/external.search.service";
import { TrafficImagesItems } from "src/interfaces/traffic.camera.response/traffic.camera.response.interface";
import { SearchResponse } from "src/interfaces/search.response/search.response.interface";
import {
  calculateDistanceInKM
} from "src/utils/utils";
import {
  AreaMetaData,
  Forecasts
} from "src/interfaces/weather.data.response/weather.data.response.interface";
import { DISTANCE_THRESHOLD_TO_GET_AREA_IN_KM } from "src/common/constants";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersSearches } from "src/typeorm/entities/user.searches";
import { FindManyOptions, QueryFailedError, Repository } from "typeorm";
import { AutheService } from "src/global-service/auth-service/auth.service";

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(UsersSearches)
    private usersSearchesRepository: Repository<UsersSearches>,
    private readonly externalSearchService: ExternalSearchService
  ) {}

  async findAllTrafficImagesByDateTime(
    dateTime: string
  ): Promise<SearchResponse[]> {
    const data: TrafficImagesItems[] =
      await this.externalSearchService.findTrafficImagesByDateTime(dateTime);
    const weatherData =
      await this.externalSearchService.fetchWeatherData2Hours(dateTime);

    const response = [] as SearchResponse[];
    data.forEach(async (cameraDetails) => {
      const { latitude, longitude } = cameraDetails.location;

      const location = this.mapTrafficCameraWithLocation(
        weatherData.area_metadata,
        latitude as number,
        longitude as number
      );
      response.push({
        location,
        image: cameraDetails.image as string,
      });
    });

    await this.saveSearch(dateTime);

    return response;
  }

  async findWeatherData(dateTime: string, location: string): Promise<string> {
    const weatherData =
      await this.externalSearchService.fetchWeatherData2Hours(dateTime);

    this.saveSearch(dateTime, location);
    return this.getWeatherDataForLocation(
      weatherData.items[0].forecasts,
      location
    );
  }

  private mapTrafficCameraWithLocation(
    areaMetaData: AreaMetaData[],
    latitudeFromCamera: number,
    longitudeFromCamera: number
  ): string {
    let areaName = "";

    areaMetaData.forEach((areaData: AreaMetaData) => {
      const { latitude, longitude } = areaData.label_location;
      const distance = calculateDistanceInKM(
        latitudeFromCamera,
        latitude,
        longitudeFromCamera,
        longitude
      );
      if (distance <= DISTANCE_THRESHOLD_TO_GET_AREA_IN_KM) {
        areaName = areaData.name;
        return;
      }
    });

    return areaName;
  }

  private getWeatherDataForLocation(
    forecastData: Forecasts[],
    location: string
  ): string {
    let forcastText = "";
    forecastData.forEach((forcast: Forecasts) => {
      if (location.toLowerCase() === forcast.area.toLowerCase()) {
        forcastText = forcast.forecast;
      }
    });

    return forcastText;
  }

  private async saveSearch(
    dateString: string,
    location?: string
  ): Promise<void> {
    const newSearch = this.usersSearchesRepository.create({
      searchDateTime: new Date(Date.parse(dateString)),
      userId: AutheService.sessionId,
      location,
    });

    await this.usersSearchesRepository.save(newSearch);
  }
}
