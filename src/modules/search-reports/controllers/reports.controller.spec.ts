import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { ReportsService } from '../services/reports.service';

describe('ReportsController', () => {
  let controller: ReportsController;
  let dependencyServiceMock: jest.Mocked<ReportsService>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        {
          provide: ReportsService,
          useFactory: () => ({
            getMostRecentSearchesByAllUsers: jest.fn(() => {}),
            getTop10SearchesByDate: jest.fn(() => {}),
            getTopSearchesOfTheDay:jest.fn(() => {}),
          }),
        },
      ],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
    dependencyServiceMock = module.get<ReportsService>(
      ReportsService
    ) as jest.Mocked<ReportsService>;
  });

  describe("getRecentSearchByUser()", () => {
    it("should return data when call recent search by user api", async () => {
      const mockData = [
        {
          created_date: new Date(),
          location: "loc",
          id: 1,
          search_date_time: new Date(),
          user_id: "user_id",
        },
      ];
      dependencyServiceMock.getMostRecentSearchesByAllUsers.mockResolvedValue(
        Promise.resolve(mockData)
      );

      const response = await controller.getRecentSearchByUser();

      expect(response).toBe(mockData);
      expect(
        dependencyServiceMock.getMostRecentSearchesByAllUsers
      ).toHaveBeenCalled();
    });

    it("should throw error when service throws error", async () => {
      dependencyServiceMock.getMostRecentSearchesByAllUsers.mockRejectedValue(
        new Error("error")
      );

      try {
        const response = await controller.getRecentSearchByUser();
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }

      expect(
        dependencyServiceMock.getMostRecentSearchesByAllUsers
      ).toHaveBeenCalled();
    });
  });

  describe("getTop10SearchesByDate()", () => {
    it("should return data when call recent search by user api", async () => {
      const mockData = [
        {
          created_date: new Date(),
          location: "loc",
          id: 1,
          search_date_time: new Date(),
          user_id: "user_id",
        },
      ];
      dependencyServiceMock.getTop10SearchesByDate.mockResolvedValue(
        Promise.resolve(mockData)
      );

      const response = await controller.getTop10SearchesByDate('20/01/2024');

      expect(response).toBe(mockData);
      expect(
        dependencyServiceMock.getTop10SearchesByDate
      ).toHaveBeenCalled();
    });

    it("should throw error when service throws error", async () => {
      dependencyServiceMock.getMostRecentSearchesByAllUsers.mockRejectedValue(
        new Error("error")
      );

      try {
        const response = await controller.getTop10SearchesByDate('20/01/2024');
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }

      expect(
        dependencyServiceMock.getTop10SearchesByDate
      ).toHaveBeenCalled();
    });
  });

  describe("getMostSearchesByDate()", () => {
    it("should return data when call recent search by user api", async () => {
      const mockData = 
        {
          created_date: '20/01/2024 10:22:34',
          count: 3,
        };
      dependencyServiceMock.getTopSearchesOfTheDay.mockResolvedValue(
        Promise.resolve(mockData)
      );

      const response = await controller.getMostSearchesByDate('20/01/2024');

      expect(response).toBe(mockData);
      expect(
        dependencyServiceMock.getTopSearchesOfTheDay
      ).toHaveBeenCalled();
    });

    it("should throw error when service throws error", async () => {
      dependencyServiceMock.getTopSearchesOfTheDay.mockRejectedValue(
        new Error("error")
      );

      try {
        const response = await controller.getMostSearchesByDate('20/01/2024');
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }

      expect(
        dependencyServiceMock.getTopSearchesOfTheDay
      ).toHaveBeenCalled();
    });
  });
});
