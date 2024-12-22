import { Gender } from "../enums/gender.enum"

export interface loginResponseDto {
  token: string,
  user: {
    firstName: string,
    lastName: string,
    email: string,
    gender: Gender,
    walletBalance: number,
    bonusBalance: number,
    profitBalance: number,
    depositBalance: number,
    isAdmin: boolean,
    isVerified: boolean,
    isTokenized: boolean,
    tradingUser: boolean,
  }
}
