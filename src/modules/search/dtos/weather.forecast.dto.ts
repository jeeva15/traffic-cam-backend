import { IsNotEmpty } from "class-validator";

export class WeatherForecastRequest {

 @IsNotEmpty() 
 date_time: string;
 @IsNotEmpty()
  location: string;
}
