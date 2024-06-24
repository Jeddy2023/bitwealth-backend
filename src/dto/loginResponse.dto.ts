import { Gender } from "../enums/gender.enum"

export interface loginResponseDto {
  token: string,
  user: {
    firstName: string,
    lastName: string,
    email: string,
    gender: Gender,
    isAdmin: boolean
  }
}
