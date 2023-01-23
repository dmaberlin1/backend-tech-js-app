import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Watchlist } from "../../watchlist/models/watchlist.model";

@Table
export class User extends Model{
@Column
  firstName:string
@Column
username:string

@Column
email:string

 @Column
 password:string
  @Column
  pin:string
    // надо будет изменить на number
@Column
telegram:string
  @HasMany(()=>Watchlist,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
  })
  watchlist:Watchlist[]
}