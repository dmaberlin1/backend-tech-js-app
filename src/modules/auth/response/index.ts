import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class UserResponse {
  @ApiProperty()
  @IsString()
  firstName:string
  @ApiProperty()
  @IsString()
  username:string
  @ApiProperty()
  @IsString()
  email:string
  @ApiProperty()
  @IsString()
  pin:string
  @ApiProperty()
  @IsString()
  password:string
  @ApiProperty()
  @IsString()
  telegram:string
}

export class AuthUserResponse{
  @ApiProperty()
  user:UserResponse

  @ApiProperty()
  @IsString()
  token:string
}