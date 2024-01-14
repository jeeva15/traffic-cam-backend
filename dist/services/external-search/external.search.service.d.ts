import { HttpService } from "@nestjs/axios";
import { TrafficCameraItems } from "src/interfaces/traffic.camera.response/traffic.camera.response.interface";
export declare class ExternalSearchService {
    private readonly httpService;
    private readonly logger;
    constructor(httpService: HttpService);
    findCamerasByDateTime(dateTime: string): Promise<TrafficCameraItems[]>;
}
