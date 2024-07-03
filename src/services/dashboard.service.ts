import { dashboardDto } from "../dto/dashboard.dto";
import { SendEmailDto } from "../dto/email.dto";

export interface DashboardService {
  getDashboardData(): Promise<dashboardDto>;
  sendEmail(data: SendEmailDto): Promise<void>;
}