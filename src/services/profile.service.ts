import { ProfileDto } from "../dto/profile.dto";
import { ProfileEditDto } from "../dto/profileEdit.dto";

export interface ProfileService {
  getUserProfile(userId: string): Promise<ProfileDto>;
  editProfile(userId: string, data: ProfileEditDto): Promise<void>;
  changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void>;
}