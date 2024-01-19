import { IsNotEmpty, IsEmpty } from "class-validator";

export class TrafficImagesRequest {
  @IsNotEmpty() 
  date_time: string;
}
