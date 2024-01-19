import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersSearches {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "timestamptz" })
  searchDateTime: Date;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdDate: Date;

  @Column({ length: 255 })
  userId: String;

  @Column({ length: 255, nullable: true })
  location: String;
}
