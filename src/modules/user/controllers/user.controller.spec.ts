import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "../services/user.service";

describe("ControllersController", () => {
  let controller: UserController;
  let dependencyServiceMock: jest.Mocked<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useFactory: () => ({
            getUsersRecentSearchByUser: jest.fn(() => {}),
            getUsersRecentSearchByOthers: jest.fn(() => {}),
          }),
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    dependencyServiceMock = module.get<UserService>(
      UserService
    ) as jest.Mocked<UserService>;
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
      dependencyServiceMock.getUsersRecentSearchByUser.mockResolvedValue(
        Promise.resolve(mockData)
      );

      const response = await controller.getRecentSearchByUser();

      expect(response).toBe(mockData);
      expect(
        dependencyServiceMock.getUsersRecentSearchByUser
      ).toHaveBeenCalled();
    });

    it("should throw error when service throws error", async () => {
      dependencyServiceMock.getUsersRecentSearchByUser.mockRejectedValue(
        new Error("error")
      );

      try {
        const response = await controller.getRecentSearchByUser();
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }

      expect(
        dependencyServiceMock.getUsersRecentSearchByUser
      ).toHaveBeenCalled();
    });
  });

  describe("getRecentSearch()", () => {
    it("should return data when call recent search api", async () => {
      const mockData = [
        {
          created_date: new Date(),
          location: "loc",
          id: 1,
          search_date_time: new Date(),
          user_id: "user_id",
        },
      ];
      dependencyServiceMock.getUsersRecentSearchByOthers.mockResolvedValue(
        Promise.resolve(mockData)
      );

      const response = await controller.getRecentSearch();

      expect(response).toBe(mockData);
      expect(
        dependencyServiceMock.getUsersRecentSearchByOthers
      ).toHaveBeenCalled();
    });

    it("should throw error when service throws error", async () => {
      dependencyServiceMock.getUsersRecentSearchByOthers.mockRejectedValue(
        new Error("error")
      );

      try {
        const response = await controller.getRecentSearch();
      } catch (err: any) {
        expect(err.message).toEqual("error");
      }

      expect(
        dependencyServiceMock.getUsersRecentSearchByOthers
      ).toHaveBeenCalled();
    });
  });
});
