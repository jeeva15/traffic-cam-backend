import { Injectable } from "@nestjs/common";
import { ExternalSearchService } from "../external-search/external.search.service";
import { TrafficImagesItems } from "src/interfaces/traffic.camera.response/traffic.camera.response.interface";
import { SearchResponse } from "src/interfaces/search.response/search.response.interface";
import { calculateDistanceInKM } from "src/utils/utils";
import {
  AreaMetaData,
  Forecasts,
} from "src/interfaces/weather.data.response/weather.data.response.interface";
import { DISTANCE_THRESHOLD_TO_GET_AREA_IN_KM } from "src/common/constants";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersSearches } from "src/typeorm/entities/user.searches";
import { Repository } from "typeorm";
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

      const location = this.findNearByLocationForTrafficCamera(
        weatherData.area_metadata,
        latitude as number,
        longitude as number
      );
      
        response.push({
          weatherLocation: location,
          location: `${cameraDetails.camera_id} - ${location}`,
          image: cameraDetails.image as string,
        });
      
    });

    await this.saveSearch(dateTime);

    return response;
  }

  async findWeatherDataForLocation(
    dateTime: string,
    location: string
  ): Promise<string> {
    const weatherData =
      await this.externalSearchService.fetchWeatherData2Hours(dateTime);

    this.saveSearch(dateTime, location);

    return this.getWeatherDataForLocation(
      weatherData.items[0].forecasts,
      location
    );
  }

  private findNearByLocationForTrafficCamera(
    areaMetaData: AreaMetaData[],
    latitudeFromCamera: number,
    longitudeFromCamera: number
  ): string {
    let areaName = "";

    const distanceArr: { distance: number; areaName: string }[] = [];
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
        distanceArr.push({ distance, areaName: areaData.name });
      }
    });

    // sort by distance
    distanceArr.sort((a: any, b: any) => a.distance - b.distance);

    // find nearest area to the camera and return
    return distanceArr[0]?.areaName ? distanceArr[0].areaName : "";
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
      search_date_time: new Date(Date.parse(dateString)),
      user_id: AutheService.sessionId,
      location,
    });

    await this.usersSearchesRepository.insert(newSearch);
  }
}
