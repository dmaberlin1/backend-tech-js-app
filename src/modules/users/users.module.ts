import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";

@Module({
  imports:[SequelizeModule.forFeature([User])],
  //method forFeature , говорит о том что мы будем его использовать в рамках этого модуля
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
