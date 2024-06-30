import { dashboardDto } from "../../dto/dashboard.dto";
import { DashboardService } from "../dashboard.service";
import { User } from "../../models/user.model";
import { Deposit } from "../../models/deposit.model";

class DashboardServiceImpl implements DashboardService {
  async getDashboardData(): Promise<dashboardDto> {
    const users = await User.countDocuments();
    const deposits = await Deposit.countDocuments();

    return { users, deposits }
  }
}

export default DashboardServiceImpl;