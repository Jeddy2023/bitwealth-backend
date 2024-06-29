import { dashboardDto } from "../dto/dashboard.dto";

export interface DashboardService {
  getDashboardData(): Promise<dashboardDto>;
}