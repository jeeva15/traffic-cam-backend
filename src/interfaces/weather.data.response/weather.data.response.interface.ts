export interface WeatherDataResponse {
  area_metadata: AreaMetaData[];
  items: [
    {
      forecasts: Forecasts[];
    },
  ];
}

export interface AreaMetaData {
  name: string;
  label_location: {
    longitude: number;
    latitude: number;
  };
}

export interface Forecasts {
  area: string;
  forecast: string;
}
