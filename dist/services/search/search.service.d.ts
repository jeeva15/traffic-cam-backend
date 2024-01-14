import { ExternalSearchService } from "../external-search/external.search.service";
import { TrafficCameraItems } from "src/interfaces/traffic.camera.response/traffic.camera.response.interface";
export declare class SearchService {
    private readonly externalSearchService;
    constructor(externalSearchService: ExternalSearchService);
    findAllCamerasByDateTime(dateTime: string): Promise<TrafficCameraItems[]>;
}
