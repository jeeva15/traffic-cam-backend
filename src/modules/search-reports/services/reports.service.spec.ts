import { Test, TestingModule } from "@nestjs/testing";
import { ReportsService } from "./reports.service";
import { UsersSearches } from "src/typeorm/entities/user.searches";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

describe("ReportsService", () => {
  let service: ReportsService;
  let usersSearchesRepository: Repository<UsersSearches>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(UsersSearches),
          useClass: Repository,
          useValue: {},
        },
      ],
    }).compile();

    const usersSearchesRepository = module.get<Repository<UsersSearches>>(
      getRepositoryToken(UsersSearches)
    );
    service = module.get<ReportsService>(ReportsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  describe("getMostRecentSearchesByAllUsers()", () => {
    it("should return most recent searches By all users", () => {
      const testData: UsersSearches[] = [
        {
          id: 1,
          location: "Geylang",
          user_id: "1",
          search_date_time: new Date(Date.parse("2024/01/20")),
          created_date: new Date(Date.parse("2024/01/20")),
        },
      ];

      // jest
      //   .spyOn(usersSearchesRepository, "find")
      //   .mockResolvedValueOnce(testData);
    });
  });

  describe("getTopSearchesOfTheDay()", () => {
    it("should return most seached date & time and count", () => {
      const mockData = [
        {
          created_date: new Date("2024-01-19 13:54:10+08"),
        },
        {
          created_date: new Date("2024-01-19 13:54:10+08"),
        },
        {
          created_date: new Date("2024-01-19 16:54:10+08"),
        },
        {
          created_date: new Date("2024-01-19 16:59:13+08"),
        },
        {
          created_date: new Date("2024-01-19 17:24:10+08"),
        },
        {
          created_date: new Date("2024-01-19 17:25:10+08"),
        },
        {
          created_date: new Date("2024-01-19 17:34:10+08"),
        },
        {
          created_date: new Date("2024-01-19 18:54:10+08"),
        },
      ];

      const results = service.findMostSearchesInAHour(mockData);

      expect(results.hasOwnProperty("2024/1/19 16:54:10")).toBe(true);
      expect(results.count).toBe(5);
    });

    it("should return most seached date & time and count when there is only one search", () => {
      const mockData = [
        {
          created_date: new Date("2024-01-19 13:54:10+08"),
        },
      ];

      const results = service.findMostSearchesInAHour(mockData);

      expect(results.hasOwnProperty("2024/1/19 13:54:10")).toBe(true);
      expect(results.count).toBe(1);
    });
  });
});
