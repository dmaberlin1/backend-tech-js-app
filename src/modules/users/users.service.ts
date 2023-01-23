import { BadRequestException, Delete, Injectable, Req, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from "bcrypt";
import { CreateUserDTO } from "./dto";
import { AppError } from "../../common/constants/errors";
import { UpdateUserDTO } from "./dto";
import { JwtAuthGuard } from "../../guards/jwt-guards";
import { Watchlist } from "../watchlist/models/watchlist.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) {
  }

  async hashPassword(password) {
    return bcrypt.hash(password, 9);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  // async hashPin(pin){
  //   return bcrypt.hash(pin,4)
  // } необходимо разобраться с пином
  async createUser(dto): Promise<CreateUserDTO> {


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
  }

  async publicUser(email: string) {
    return this.userRepository.findOne({
      where: { email: email },
      attributes: { exclude: ["password"] },
      include:{
        model:Watchlist,
        required:false
      }
    });
  }

  async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    await this.userRepository.update(dto, { where: { email } });
    return dto;
  }

  async deleteUser (email:string):Promise<boolean>{
    await  this.userRepository.destroy({where:{email:email}})
    return true
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
