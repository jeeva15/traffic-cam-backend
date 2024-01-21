import { IsBase64, IsNotEmpty } from "class-validator";

export class TopSearchRequest {
    @IsNotEmpty() 
    date: string; //yyyy/mm/dd
  }