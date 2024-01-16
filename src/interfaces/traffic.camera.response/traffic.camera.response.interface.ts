import { Timestamp } from "typeorm";

export interface TrafficCameraResponse {
  items: [{
    timestamp: Timestamp;
    cameras: TrafficCameraItems[]
  }]
}

export interface TrafficCameraItems {
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
