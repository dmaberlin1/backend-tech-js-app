//data transfer object  - инструмент отвечает за валидацию

import { Column } from "sequelize-typescript";
import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsString()
  pin: string;
  //должен быть number
  @ApiProperty()
  @IsString()
  telegram: string;
  // @IsString()
  // list: string;


}

export class UpdateUserDTO{
  @ApiProperty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsString()
  email: string;


  @ApiProperty()
  @IsString()
  pin: string;
  //должен быть number
  @ApiProperty()
  @IsString()
  telegram: string;
  // @IsString()
  // list: string;
}