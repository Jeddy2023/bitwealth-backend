import { UserResponse } from '../dto/user.dto';
import { IUser } from '../models/user.model';

export interface UserService {
  listAllUsers(page: number, pageSize: number): Promise<UserResponse[]>;
  getUserById(userId: string): Promise<IUser>;
}