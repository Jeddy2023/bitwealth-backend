import { IUser, User } from "../../models/user.model";
import { UserService } from "../user.service";
import { UserResponse } from "../../dto/user.dto";

class UserServiceImpl implements UserService {

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
        country: user.country,
        createdAt: user.createdAt
      };
    });
  }

  async getUserById(userId: string): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
}

export default UserServiceImpl;