import { Test, TestingModule } from "@nestjs/testing";
import { SearchService } from "./search.service";
import { UsersSearches } from "src/typeorm/entities/user.searches";
import { Repository } from "typeorm/repository/Repository";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ExternalSearchService } from "../external-search/external.search.service";
import { Timestamp } from "typeorm";

describe("SearchService", () => {
  let service: SearchService;
  let dependencyServiceMock: jest.Mocked<ExternalSearchService>;
  let entityRepositoryMock: jest.Mocked<Repository<UsersSearches>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: getRepositoryToken(UsersSearches),
          useFactory: () => ({
            create: jest.fn(() => {}),
            insert: jest.fn(() => {}),
          }),
        },

        {
          provide: ExternalSearchService,
          useFactory: () => ({
            findTrafficImagesByDateTime: jest.fn(() => {}),
            fetchWeatherData2Hours: jest.fn(() => {}),
          }),
        },
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
    dependencyServiceMock = module.get<ExternalSearchService>(
      ExternalSearchService
    ) as jest.Mocked<ExternalSearchService>;

    entityRepositoryMock = module.get<Repository<UsersSearches>>(
      getRepositoryToken(UsersSearches)
    ) as jest.Mocked<Repository<UsersSearches>>;
  });

  describe("findAllTrafficImagesByDateTime()", () => {
    it("should return data successfully", async () => {
      const newEntity: UsersSearches = {
        created_date: new Date(),
        location: "loc",
        id: 1,
        search_date_time: new Date(),
        user_id: "user_id",
      };
      entityRepositoryMock.insert.mockResolvedValue(newEntity as never);
      const mockTrafficCameraData = [
        {
          timestamp: Date.now(),
          location: {
            latitude: 1234.3,
            longitude: 13223.2,
          },
          image: "image.jpg",
          camera_id: "22",
        },
      ];

      const mockWeatherMetaData: any = {
        area_metadata: [
          {
            name: "name",
            label_location: {
              longitude: 111,
              latitude: 222,
            },
          },
        ],
        items: [
          {
            forecasts: [
              {
                area: "string",
                forecast: "cloudy",
              },
            ],
          },
        ],
      };
      dependencyServiceMock.findTrafficImagesByDateTime.mockResolvedValue(
        Promise.resolve(mockTrafficCameraData)
      );
      dependencyServiceMock.fetchWeatherData2Hours.mockResolvedValue(
        Promise.resolve(mockWeatherMetaData)
      );

      const response =
        await service.findAllTrafficImagesByDateTime("2024/20/22");

      expect(response).toMatchObject([
        { image: "image.jpg", location: "22 - ", weatherLocation: "" },
      ]);
    });
  });

  describe("findAllTrafficImagesByDateTime()", () => {
    it("should return data successfully", async () => {
      const newEntity: UsersSearches = {
        created_date: new Date(),
        location: "loc",
        id: 1,
        search_date_time: new Date(),
        user_id: "user_id",
      };
      entityRepositoryMock.insert.mockResolvedValue(newEntity as never);
      const mockTrafficCameraData = [
        {
          timestamp: Date.now(),
          location: {
            latitude: 1234.3,
            longitude: 13223.2,
          },
          image: "image.jpg",
          camera_id: "22",
        },
      ];

      const mockWeatherMetaData: any = {
        area_metadata: [
          {
            name: "name",
            label_location: {
              longitude: 111,
              latitude: 222,
            },
          },
        ],
        items: [
          {
            forecasts: [
              {
                area: "string",
                forecast: "cloudy",
              },
            ],
          },
        ],
      };
      dependencyServiceMock.findTrafficImagesByDateTime.mockResolvedValue(
        Promise.resolve(mockTrafficCameraData)
      );
      dependencyServiceMock.fetchWeatherData2Hours.mockResolvedValue(
        Promise.resolve(mockWeatherMetaData)
      );

      const response =
        await service.findAllTrafficImagesByDateTime("2024/20/22");

      expect(response).toMatchObject([
        { image: "image.jpg", location: "22 - ", weatherLocation: "" },
      ]);
    });
  });
});
