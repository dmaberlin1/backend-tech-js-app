import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { WatchlistService } from "./watchlist.service";
import { Watchlist } from "./models/watchlist.model";
import { WatchListDTO } from "./dto";
import { JwtAuthGuard } from "../../guards/jwt-guards";

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService:WatchlistService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createAsset (@Body() assetDto:WatchListDTO,@Req() request){
    const user=request.user
    return this.watchlistService.createAsset(user,assetDto)
  }


  // в этих методах нет необходимости
  // @Get('get-all')
  // getAllAssets(){
  //   return
  // }


  // @Patch('update')
  // updateAsset(){
  //   return
  // }


@UseGuards(JwtAuthGuard)
  @Delete()
  deleteAsset(@Query('id')assetId:string,@Req()request):Promise<boolean>{
    const {id}=request.user
    return this.watchlistService.deleteAsset(id,assetId)
  }
}
