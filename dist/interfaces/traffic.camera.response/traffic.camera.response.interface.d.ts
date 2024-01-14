import { Timestamp } from "typeorm";
export interface TrafficCameraResponse {
    items: TrafficCameraItems[];
}
export interface TrafficCameraItems {
    timestamp: Timestamp;
    cameras: [
        {
            timestamp: Timestamp;
            image: String;
            location: {
                latitude: Number;
                longitude: Number;
            };
            camera_id: String;
            image_metadata: {
                height: Number;
                width: Number;
                md5: String;
            };
        }
    ];
}
