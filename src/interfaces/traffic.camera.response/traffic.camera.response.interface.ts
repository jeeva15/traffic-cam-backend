import { Timestamp } from "typeorm";

export interface TrafficImagesResponse {
  items: [{
    timestamp: Timestamp;
    cameras: TrafficImagesItems[]
  }]
}

export interface TrafficImagesItems {
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
