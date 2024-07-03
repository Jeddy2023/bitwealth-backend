import { dashboardDto } from "../../dto/dashboard.dto";
import { DashboardService } from "../dashboard.service";
import { User } from "../../models/user.model";
import { Deposit } from "../../models/deposit.model";
import { SendEmailDto } from "../../dto/email.dto";
import { sendEmail } from "../../utils/email.utills";

class DashboardServiceImpl implements DashboardService {
  async getDashboardData(): Promise<dashboardDto> {
    const users = await User.countDocuments();
    const deposits = await Deposit.countDocuments();

    return { users, deposits }
  }
  async sendEmail(data: SendEmailDto): Promise<void> {
    const { email, subject, message} = data;

    const templatePath = "../template/customercareMessage.handlebars";
    await sendEmail(email, subject, {message}, templatePath);
  }
}

export default DashboardServiceImpl;