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

  async getUsersRecentSearch(): Promise<UsersSearches[]> {
    console.log("userid=", AutheService.sessionId)
    return await this.usersSearchesRepository
      .find({
        where: { userId: AutheService.sessionId },
        order: {
          createdDate: "DESC",
        },
      })
      .then((searches) => {
        return searches.slice(0, 3); // only last 3 records
      });
  }
}
