import { Injectable } from "@nestjs/common";
import { ExternalSearchService } from "../external-search/external.search.service";
import { TrafficCameraItems } from "src/interfaces/traffic.camera.response/traffic.camera.response.interface";

@Injectable()
export class SearchService {
  constructor(private readonly externalSearchService: ExternalSearchService) {}

  async findAllCamerasByDateTime(dateTime: string): Promise<TrafficCameraItems[]> {
    return await this.externalSearchService.findCamerasByDateTime(dateTime);
  }
}
