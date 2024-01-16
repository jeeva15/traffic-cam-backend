import { Injectable, NotFoundException } from "@nestjs/common";
import { ExternalSearchService } from "../external-search/external.search.service";
import { TrafficCameraItems } from "src/interfaces/traffic.camera.response/traffic.camera.response.interface";
import { SearchResponse } from "src/interfaces/search.response/search.response.interface";
import {
  calculateDistanceBetween2LatLong,
  getCurrentDateTimeString,
} from "src/utils/utils";
import {
  AreaMetaData,
  Forecasts,
} from "src/interfaces/weather.data.response/weather.data.response.interface";
import { DISTANCE_THRESHOLD_TO_GET_AREA_IN_KM } from "src/common/constants";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersSearches } from "src/typeorm/entities/user.searches";
import { Repository } from "typeorm";

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(UsersSearches)
    private usersSearchesRepository: Repository<UsersSearches>,
    private readonly externalSearchService: ExternalSearchService,
  ) {}

  async findAllCamerasImagesByDateTime(dateTime:string, userId: string): Promise<SearchResponse[]> {
    const data: TrafficCameraItems[] =
      await this.externalSearchService.findCamerasByDateTime(dateTime);
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
        weather: this.mapTrafficCameraWithWeatherData(
          weatherData.items[0].forecasts,
          location
        ),
      });
    });

    this.saveSearch(dateTime, userId)

    return response;
  }

  async findWeatherData(dateTime: string): Promise<any> {
    return await this.externalSearchService.fetchWeatherData2Hours(dateTime);
  }

  private mapTrafficCameraWithLocation(
    areaMetaData: AreaMetaData[],
    latitudeFromCamera: number,
    longitudeFromCamera: number
  ): string {
    let areaName = "";

    areaMetaData.forEach((areaData: AreaMetaData) => {
      const { latitude, longitude } = areaData.label_location;
      const distance = calculateDistanceBetween2LatLong(
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

  private mapTrafficCameraWithWeatherData(
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

  private saveSearch(dateString:string, userId:string): void {
    if (!userId) {
      throw new NotFoundException('User not found');
    }
    
    const newSearch = this.usersSearchesRepository.create({
      searchDateTime: new Date(Date.parse(atob(dateString))),
      userId
    });

    this.usersSearchesRepository.save(newSearch);
  }
}
