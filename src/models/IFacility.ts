import { ISystem } from "./ISystem"

export type IFacility = {
  id: string
  name:string
  note?: string
  system: ISystem
}