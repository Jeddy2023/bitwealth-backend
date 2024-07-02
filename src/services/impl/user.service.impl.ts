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

    const { bonusBalance, profitBalance, depositBalance } = data;
    if (bonusBalance === undefined && profitBalance === undefined && depositBalance === undefined) {
      throw new CustomError(400, "No balances provided for update");
    }

    // verify user is updating to new details
    let isUpdated = false;

    if (bonusBalance !== undefined) {
      if (bonusBalance !== user.bonusBalance) {
        user.bonusBalance = bonusBalance;
        isUpdated = true;
      }
    }

    if (profitBalance !== undefined) {
      if (profitBalance !== user.profitBalance) {
        user.profitBalance = profitBalance;
        isUpdated = true;
      }
    }

    if (depositBalance !== undefined) {
      if (depositBalance !== user.depositBalance) {
        user.depositBalance = depositBalance;
        isUpdated = true;
      }
    }

    if (!isUpdated) {
      throw new CustomError(400, "No changes made to balances");
    }

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
        bonusBalance: user.bonusBalance,
        depositBalance: user.depositBalance,
        profitBalance: user.profitBalance,
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
      bonusBalance: user.bonusBalance,
      depositBalance: user.depositBalance,
      profitBalance: user.profitBalance,
      address: user.address,
      country: user.country,
      createdAt: user.createdAt
    };
  }
}

export default UserServiceImpl;