import { ChangePasswordDto } from "../../dto/changePassword.dto";
import { ProfileDto } from "../../dto/profile.dto";
import { IUser, User } from "../../models/user.model";
import { CustomError } from "../../utils/customError.utils";
import { ProfileService } from "../profile.service";
import bcrypt from "bcryptjs";

class ProfileServiceImpl implements ProfileService {

  async changePassword(userId: string, data: ChangePasswordDto): Promise<void> {
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, "User not found");
    }

    const isMatch = await bcrypt.compare(data.oldPassword, user.password);
    if (!isMatch) {
      throw new CustomError(400, "Invalid old password");
    }

    // verify that user is updating to new details
    if (data.oldPassword === data.newPassword) {
      throw new CustomError(400, "New password cannot be same as old");
    }

    user.password = await bcrypt.hash(data.newPassword, Number(process.env.SALT));
    await user.save();
  }

  async editProfile(userId: string, data: ProfileDto): Promise<void> {
    const { phoneNumber, address } = data;
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, "User not found");
    }

    // check that user updates to new details
    if (phoneNumber === user.phoneNumber) {
      throw new CustomError(400, "New phone number cannot be same as old");
    }

    if (address === user.address) {
      throw new CustomError(400, "New address cannot be same as old");
    }

    // update details
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (address) user.address = address;

    await user.save();
  }

  async getUserProfile(userId: string): Promise<ProfileDto> {
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, "User not found");
    }

    return {
      fullName: `${user.firstName} ${user.lastName}`,
      displayName: `${user.firstName}`,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address
    }
  }

}

export default ProfileServiceImpl;