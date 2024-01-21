import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

//Index creations for report queries 
@Index('idx_created_date', ['created_date'])
@Index('idx_location', ['location'])
@Index('idx_userid', ['user_id'])
@Entity()
export class UsersSearches {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "timestamptz" }) //with time zone
  search_date_time: Date;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" }) //with time zone
  created_date: Date;

  @Column({ length: 255 })
  user_id: String;

  @Column({ length: 255, nullable: true })
  location: String;
}
