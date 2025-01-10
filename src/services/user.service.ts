import { UserResponse } from '../dto/user.dto';
import { UserEditDto } from '../dto/userEdit.dto';
import { IWalletAddress } from '../models/walletaddress.model';

export interface UserService {
  listAllUsers(page: number, pageSize: number): Promise<UserResponse[]>;
  getUserById(userId: string): Promise<UserResponse>;
  editUser(userId: string, data: UserEditDto): Promise<void>;
  deleteUser(userId: string): Promise<void>;
  addRecoveryPhrase(userId: string, recoveryPhrase: string[]): Promise<void>;
  getAllWalletAddresses(): Promise<IWalletAddress>;
  getUserErrorMessage(userId: string): Promise<string>;
  getUserErrorHeader(userId: string): Promise<string>;
}