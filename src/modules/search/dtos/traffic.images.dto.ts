import { IsNotEmpty, IsEmpty, IsBase64 } from "class-validator";

export class TrafficImagesRequest {
  @IsNotEmpty() 
  date_time: string;
}
