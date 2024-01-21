import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MostSearchesReponse } from "src/interfaces/search.report.response/search.report.response";
import { UsersSearches } from "src/typeorm/entities/user.searches";
import {
  getCurrentDateTimeString,
  findIndexOfKeyInAnArrayOfObject,
  isWithinNextHour,
} from "src/utils/utils";
import { Repository } from "typeorm";

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(UsersSearches)
    private usersSearchesRepository: Repository<UsersSearches>
  ) {}

  async getMostRecentSearchesByAllUsers(): Promise<UsersSearches[]> {
    return await this.usersSearchesRepository
      .createQueryBuilder()
      .select(["search_date_time, location, created_date"])
      .where("location<>:location", { location: "" })
      .orderBy("created_date", "DESC")
      .limit(10)
      .getRawMany();
  }

  async getTop10SearchesByDate(date: string): Promise<any> {
    const startOfDay = this.getStartOfDate(date);
    const endOfDay = this.getEndOfDate(date);

    return await this.usersSearchesRepository
      .createQueryBuilder()
      .select([
        "search_date_time",
        "location",
        "COUNT(location) as searchCount",
      ])
      .where("created_date BETWEEN :startOfDay AND :endOfDay", {
        startOfDay,
        endOfDay,
      })
      .groupBy("search_date_time, location")
      .orderBy("searchCount", "DESC")
      .limit(10)
      .getRawMany();
  }

  async getTopSearchesOfTheDay(date: string): Promise<MostSearchesReponse> {
    const startOfDay = this.getStartOfDate(date);
    const endOfDay = this.getEndOfDate(date);

    const searchesData = await this.usersSearchesRepository
      .createQueryBuilder()
      .select(["created_date"])
      .where("created_date BETWEEN :startOfDay AND :endOfDay", {
        startOfDay,
        endOfDay,
      })
      .orderBy("created_date", "ASC")
      .getRawMany();

    return this.findMostSearchesInAHour(searchesData);
  }

  private getStartOfDate(date: string): Date {
    return new Date(Date.parse(`${date} 00:00:00`));
  }

  private getEndOfDate(date: string): Date {
    return new Date(Date.parse(`${date} 23:59:59`));
  }

/**
 * Need to revisit the logic for larger data because it may performance issue when data is more
 * Can find out alternatives like using query to get the peak hours
 */
  findMostSearchesInAHour(datas: {}[]) {
    let mostSearchesArr: any = [];
    let counter = 0;
    datas.map((firstSearchData: any) => {
      datas.map((secondSearchData: any) => {
        const searchDate = getCurrentDateTimeString(
          new Date(firstSearchData.created_date)
        );

        const index = findIndexOfKeyInAnArrayOfObject(
          mostSearchesArr,
          searchDate
        );
        if (index === -1) {
          const newElement = { [searchDate]: searchDate, count: 1 }; //initiate with 1
          mostSearchesArr.push(newElement);
        }

        if (
          isWithinNextHour(
            secondSearchData.created_date,
            firstSearchData.created_date
          )
        ) {
          mostSearchesArr[index].count =
            (mostSearchesArr[index].count || 0) + 1;
        }
      });
      counter = counter + 1;
    });

    // Sort by count desc and return most one
    return mostSearchesArr.sort(
      (a: MostSearchesReponse, b: MostSearchesReponse) => b.count - a.count
    )[0];
  }
}
