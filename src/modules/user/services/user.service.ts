import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AutheService } from "src/global-service/auth-service/auth.service";
import { UsersSearches } from "src/typeorm/entities/user.searches";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersSearches)
    private usersSearchesRepository: Repository<UsersSearches>
  ) {}

  async getUsersRecentSearchByUser(): Promise<UsersSearches[]> {
    return await this.usersSearchesRepository
      .createQueryBuilder()
      .select("search_date_time, location")
      .where("user_id=:id", { id: AutheService.sessionId })
      .orderBy("created_date", "DESC")
      .limit(2)
      .getRawMany();
  }

  async getUsersRecentSearchByOthers(): Promise<UsersSearches[]> {
    return await this.usersSearchesRepository
      .createQueryBuilder()
      .select("search_date_time, location")
      .where("user_id<>:id", { id: AutheService.sessionId })
      .orderBy("created_date", "DESC")
      .limit(2)
      .getRawMany();
  }
}
