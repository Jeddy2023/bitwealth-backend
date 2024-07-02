import { ChangePasswordDto } from "../dto/changePassword.dto";
import { ProfileDto } from "../dto/profile.dto";
import { ProfileEditDto } from "../dto/profileEdit.dto";
import { UserWalletResponse } from "../dto/userWallet.dto";

export interface ProfileService {
  getUserProfile(userId: string): Promise<ProfileDto>;
  editProfile(userId: string, data: ProfileEditDto): Promise<void>;
  changePassword(userId: string, data: ChangePasswordDto): Promise<void>;
  getUserWalletDetails(userId: string): Promise<UserWalletResponse>;
}