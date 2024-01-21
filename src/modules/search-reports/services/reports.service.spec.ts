import { Test, TestingModule } from "@nestjs/testing";
import { ReportsService } from "./reports.service";
import { UsersSearches } from "src/typeorm/entities/user.searches";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("ReportsService", () => {
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(UsersSearches),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

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
});
