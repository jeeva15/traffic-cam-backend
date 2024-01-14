import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { TRAFFIC_IMAGE_API } from "src/common/constants";
import { TrafficCameraItems, TrafficCameraResponse } from "src/interfaces/traffic.camera.response/traffic.camera.response.interface";

@Injectable()
export class ExternalSearchService {
  private readonly logger = new Logger(ExternalSearchService.name);
  constructor(private readonly httpService: HttpService) {}

  async findCamerasByDateTime(dateTime: string): Promise<TrafficCameraItems[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<TrafficCameraResponse>(`${TRAFFIC_IMAGE_API}?data_time=${dateTime}`)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data);
            throw "An error happened!";
          })
        )
    );
    return data.items;
  }
}
