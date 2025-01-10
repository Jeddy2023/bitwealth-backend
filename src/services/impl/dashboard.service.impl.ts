import { dashboardDto } from "../../dto/dashboard.dto";
import { DashboardService } from "../dashboard.service";
import { User } from "../../models/user.model";
import { Deposit } from "../../models/deposit.model";
import { SendEmailDto } from "../../dto/email.dto";
import { sendEmail } from "../../utils/email.utills";
import { WalletDetails } from "../../dto/walletdetails.dto";
import { WalletAddress } from "../../models/walletaddress.model";
import { CustomError } from "../../utils/customError.utils";

class DashboardServiceImpl implements DashboardService {
  async getDashboardData(): Promise<dashboardDto> {
    const users = await User.countDocuments();
    const deposits = await Deposit.countDocuments();

    return { users, deposits }
  }
  async sendEmail(data: SendEmailDto): Promise<void> {
    const { email, subject, message } = data;

    const templatePath = "../template/customercareMessage.handlebars";
    await sendEmail(email, subject, { message }, templatePath);
  }
  async updateWalletDetails(walletDetails: WalletDetails): Promise<void> {
    const walletAddress = await WalletAddress.findOne();

    if (!walletAddress) {
      throw new CustomError(404, "Wallet address entry not found");
    }

    walletAddress.cryptocurrencies.USDT = walletDetails.USDT || walletAddress.cryptocurrencies.USDT;
    walletAddress.cryptocurrencies.BTC = walletDetails.BTC || walletAddress.cryptocurrencies.BTC;
    walletAddress.cryptocurrencies.ETH = walletDetails.ETH || walletAddress.cryptocurrencies.ETH;

    await walletAddress.save();
  }
}

export default DashboardServiceImpl;