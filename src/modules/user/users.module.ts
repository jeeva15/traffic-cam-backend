import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersSearches } from 'src/typeorm/entities/user.searches';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UsersSearches]), HttpModule],
    controllers: [UserController],
    providers: [UserService],
  })
export class UsersModule {}
