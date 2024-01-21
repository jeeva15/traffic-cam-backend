import { Module } from '@nestjs/common';
import { ReportsController } from './controllers/reports.controller';
import { ReportsService } from './services/reports.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersSearches } from 'src/typeorm/entities/user.searches';

@Module({
  imports: [TypeOrmModule.forFeature([UsersSearches]), HttpModule],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class SearchReportsModule {}
