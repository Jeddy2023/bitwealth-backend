import { IUser, User } from "../../models/user.model";
import { UserService } from "../user.service";
import { UserResponse } from "../../dto/user.dto";
import { CustomError } from "../../utils/customError.utils";
import { UserEditDto } from "../../dto/userEdit.dto";
import { IWalletAddress, WalletAddress } from "../../models/walletaddress.model";

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

    const { bonusBalance, profitBalance, depositBalance, errorMessage, errorHeader } = data;
    if (
      bonusBalance === undefined &&
      profitBalance === undefined &&
      depositBalance === undefined &&
      errorMessage === undefined &&
      errorHeader === undefined
    ) {
      throw new CustomError(400, "No fields provided for update");
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

    if (errorMessage !== undefined && errorMessage !== user.errorMessage) {
      user.errorMessage = errorMessage.trim();
      isUpdated = true;
    }

    if (errorHeader !== undefined && errorHeader !== user.errorHeader) {
      user.errorHeader = errorHeader.trim();
      isUpdated = true;
    }

    if (!isUpdated) {
      throw new CustomError(400, "No changes made to balances");
    }

    await user.save();
  }

  async getUserErrorMessage(userId: string): Promise<string> {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, "User not found");
    }

    return user.errorMessage;
  }

  async getUserErrorHeader(userId: string): Promise<string> {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, "User not found");
    }

    return user.errorHeader;
  }

  async listAllUsers(page: number, pageSize: number): Promise<UserResponse[]> {
    const offset = (page - 1) * pageSize;
    console.log(offset);
    // const users: IUser[] = await User.find().sort({ createdAt: -1 }).limit(pageSize).skip(offset);
    const users: IUser[] = await User.find().sort({ createdAt: -1 })
    return users.map((user: IUser) => {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        errorMessage: user.errorMessage,
        errorHeader: user.errorHeader,
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
      errorMessage: user.errorMessage,
      errorHeader: user.errorHeader,
      country: user.country,
      createdAt: user.createdAt
    };
  }

  async addRecoveryPhrase(userId: string, recoveryPhrase: string[]): Promise<void> {
    if (recoveryPhrase.length !== 12) {
      throw new CustomError(400, "Recovery phrase must contain exactly 12 words");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, "User not found");
    }

    user.recoveryPhrase = recoveryPhrase;
    await user.save();
  }

  async getAllWalletAddresses(): Promise<IWalletAddress> {
    const walletAddresses = await WalletAddress.findOne();
    if (!walletAddresses) {
      throw new CustomError(404, "Wallet addresses not found");
    }
    return walletAddresses;
  }
}

export default UserServiceImpl;