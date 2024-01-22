import { Test, TestingModule } from "@nestjs/testing";
import { SearchController } from "./search.controller";
import { SearchService } from "../../services/search/search.service";
import { CACHE_MANAGER, CacheModule } from "@nestjs/cache-manager";

describe("SearchController", () => {
  let controller: SearchController;
  let cacheManagerMock: any;
  let dependencyServiceMock: jest.Mocked<SearchService>;

  beforeEach(async () => {
    cacheManagerMock = {
      get: jest.fn(),
      set: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: SearchService,
          useFactory: () => ({
            findAllTrafficImagesByDateTime: jest.fn(() => {}),
            findWeatherDataForLocation: jest.fn(() => {}),
          }),
        },
        CacheModule,
        {
          provide: CACHE_MANAGER,
          useValue: cacheManagerMock,
        },
      ],
    }).compile();

    controller = module.get<SearchController>(SearchController);
    dependencyServiceMock = module.get<SearchService>(
      SearchService
    ) as jest.Mocked<SearchService>;
  });

  describe("findAllTrafficImagesByDateTime()", () => {
    it("should return data when call trafffic api", async () => {
      const mockData = [
        {
          weatherLocation: "location",
          location: "loc",
          image: "image.jpg",
        },
      ];
      dependencyServiceMock.findAllTrafficImagesByDateTime.mockResolvedValue(
        Promise.resolve(mockData)
      );

      const response = await controller.findAllTrafficImagesByDateTime({
        date_time: "2024/20/22",
      });

      expect(response).toBe(mockData);
      expect(
        dependencyServiceMock.findAllTrafficImagesByDateTime
      ).toHaveBeenCalled();
    });

    it("should throw error when service throws error", async () => {
      dependencyServiceMock.findAllTrafficImagesByDateTime.mockRejectedValue(
        new Error("error")
      );

      try {
        const response = await controller.findAllTrafficImagesByDateTime({
          date_time: "2024/20/22",
        });
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }

      expect(
        dependencyServiceMock.findAllTrafficImagesByDateTime
      ).toHaveBeenCalled();
    });
  });

  describe("findWeatherDataByDate()", () => {
    it("should return data when call weather forecast api", async () => {
      const mockData = "cloudy";
      dependencyServiceMock.findWeatherDataForLocation.mockResolvedValue(
        Promise.resolve(mockData)
      );

      const response = await controller.findWeatherDataByDate({
        date_time: "2024/20/22",
        location: "area-name"
      });

      expect(response).toBe(mockData);
      expect(
        dependencyServiceMock.findWeatherDataForLocation
      ).toHaveBeenCalled();
    });

    it("should throw error when service throws error", async () => {
      dependencyServiceMock.findWeatherDataForLocation.mockRejectedValue(
        new Error("error")
      );

      try {
         await controller.findWeatherDataByDate({
          date_time: "2024/20/22",
          location: "area-name"
        });
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }

      expect(
        dependencyServiceMock.findWeatherDataForLocation
      ).toHaveBeenCalled();
    });
  });
});
