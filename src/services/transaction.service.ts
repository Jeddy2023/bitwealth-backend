import { CreateDepositDto } from "../dto/createDeposit.dto";
import { listDepositsDto } from "../dto/listDeposits.dto";
import { UsersDepositsDto } from "../dto/listUsersDeposits.dto";

export interface TransactionService {
  deposit(userId: string, createDepositDto: CreateDepositDto): Promise<void>;
  listDeposits(page: number, pageSize: number): Promise<listDepositsDto[]>;
  listUsersDeposits(userId: string, page: number, pageSize: number): Promise<UsersDepositsDto[]>;
}
