import { Timestamp } from "typeorm";

export interface TrafficImagesResponse {
  items: [{
    timestamp: Number;
    cameras: TrafficImagesItems[]
  }]
}

export interface TrafficImagesItems {
  timestamp: Number;
  image: String;
  location: {
    latitude: Number;
    longitude: Number;
  };
  camera_id: String;
}
