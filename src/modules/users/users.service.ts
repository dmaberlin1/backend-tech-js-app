import { BadRequestException, Delete, Injectable, Req, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from "bcrypt";
import { CreateUserDTO } from "./dto";
import { AppError } from "../../common/constants/errors";
import { UpdateUserDTO } from "./dto";
import { JwtAuthGuard } from "../../guards/jwt-guards";
import { Watchlist } from "../watchlist/models/watchlist.model";
import { TokenService } from "../token/token.service";
import { AuthUserResponse } from "../auth/response";

@Injectable()
export class UsersService {
  constructor(

    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly tokenService:TokenService) {
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 9);

    } catch (e) {
      throw new Error(e);
    }
  }

  async findUserByEmail(email: string):Promise<User> {
    try{
      return this.userRepository.findOne({ where: { email: email },include:{
          model:Watchlist,
          required:false,
        } });
    }catch (e) {
      throw new Error(e)
    }
  }

  // async hashPin(pin){
  //   return bcrypt.hash(pin,4)
  // } необходимо разобраться с пином
  async createUser(dto): Promise<CreateUserDTO> {
    try{
      dto.password = await this.hashPassword(dto.password);
      // dto.pin=await this.hashPin(dto.pin)

      await this.userRepository.create({
        firstName: dto.firstName,
        username: dto.username,
        email: dto.email,
        password: dto.password,
        telegram: dto.telegram,
        pin: dto.pin

      });
      return dto;
    }catch (e) {
      throw new Error(e)
    }
  }

  async publicUser(email: string):Promise<AuthUserResponse> {
   try{
     const user=await this.userRepository.findOne({
       where: { email: email },
       attributes: { exclude: ["password"] },
       include: {
         model: Watchlist,
         required: false
       }
     });
     const token =await this.tokenService.generateJwtToken(user)
     return {user,token}
   }catch (e) {
     throw new Error(e)
   }
  }

  async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    try{
      await this.userRepository.update(dto, { where: { email } });
      return dto;
    }catch (e) {
      throw new Error(e)
    }
  }

  async deleteUser(email: string): Promise<boolean> {
   try{
     await this.userRepository.destroy({ where: { email: email } });
     return true;
   }catch (e) {
     throw new Error(e)
   }
  }

}


//вариант 1
// const newUser={
//     firstName:dto.firstName,
//   username:dto.username,
//   email:dto.email,
//   password:dto.password,
//   telegram:dto.telegram,
//   pin:dto.pin
// }
