import { UserResponse } from '../dto/user.dto';
import { UserEditDto } from '../dto/userEdit.dto';

export interface UserService {
  listAllUsers(page: number, pageSize: number): Promise<UserResponse[]>;
  getUserById(userId: string): Promise<UserResponse>;
  editUser(userId: string, data: UserEditDto): Promise<void>;
  deleteUser(userId: string): Promise<void>;
}