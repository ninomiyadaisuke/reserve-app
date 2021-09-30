import {IUser} from "./IUser"

export type ISystem = {
  createUser :IUser
  createDate : Date
  lastUpdateUser :IUser
  lastUpdate :Date
}