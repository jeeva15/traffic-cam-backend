import NodeGeocoder, { Entry } from "node-geocoder";

export interface SearchResponse {
    location?: string,
    image?: string
    weather?: string
    id?: number
}
