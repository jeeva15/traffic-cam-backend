import { TrafficCameraItems } from "src/interfaces/traffic.camera.response/traffic.camera.response.interface";
import { SearchService } from "src/services/search/search.service";
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    findAllTrafficCamerasByDateTime(date_time: string): Promise<TrafficCameraItems[]>;
}
