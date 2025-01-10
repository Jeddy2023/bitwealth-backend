import { dashboardDto } from "../dto/dashboard.dto";
import { SendEmailDto } from "../dto/email.dto";
import { WalletDetails } from "../dto/walletdetails.dto";

export interface DashboardService {
  getDashboardData(): Promise<dashboardDto>;
  sendEmail(data: SendEmailDto): Promise<void>;
  updateWalletDetails(walletDetails: WalletDetails): Promise<void>;
}