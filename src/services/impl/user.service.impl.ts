import { IUser, User } from "../../models/user.model";
import { UserService } from "../user.service";
import { UserResponse } from "../../dto/user.dto";
import { CustomError } from "../../utils/customError.utils";
import { UserEditDto } from "../../dto/userEdit.dto";

class UserServiceImpl implements UserService {

  async deleteUser(userId: string): Promise<void> {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, "User not found");
    }

    await User.deleteOne({ _id: userId });
  }

  async editUser(userId: string, data: UserEditDto): Promise<void> {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, "User not found");
    }

    const { walletBalance } = data;
    if (!walletBalance) {
      throw new CustomError(400, "No data to update");
    }

    // verify user is updating to new details
    if (walletBalance && walletBalance === user.walletBalance) {
      throw new CustomError(400, "New wallet balance cannot be same as old");
    }

    if (walletBalance) user.walletBalance = walletBalance;

    await user.save();
  }

  async listAllUsers(page: number, pageSize: number): Promise<UserResponse[]> {
    const offset = (page - 1) * pageSize;
    const users: IUser[] = await User.find().sort({ createdAt: -1 }).limit(pageSize).skip(offset);
    return users.map((user: IUser) => {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        walletBalance: user.walletBalance,
        country: user.country,
        createdAt: user.createdAt
      };
    });
  }

  async getUserById(userId: string): Promise<UserResponse> {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, "User not found");
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      walletBalance: user.walletBalance,
      address: user.address,
      country: user.country,
      createdAt: user.createdAt
    };
  }
}

export default UserServiceImpl;