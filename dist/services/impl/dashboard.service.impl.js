"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../models/user.model");
const deposit_model_1 = require("../../models/deposit.model");
const email_utills_1 = require("../../utils/email.utills");
const walletaddress_model_1 = require("../../models/walletaddress.model");
const customError_utils_1 = require("../../utils/customError.utils");
class DashboardServiceImpl {
    async getDashboardData() {
        const users = await user_model_1.User.countDocuments();
        const deposits = await deposit_model_1.Deposit.countDocuments();
        return { users, deposits };
    }
    async sendEmail(data) {
        const { email, subject, message } = data;
        const templatePath = "../template/customercareMessage.handlebars";
        await (0, email_utills_1.sendEmail)(email, subject, { message }, templatePath);
    }
    async updateWalletDetails(walletDetails) {
        const walletAddress = await walletaddress_model_1.WalletAddress.findOne();
        if (!walletAddress) {
            throw new customError_utils_1.CustomError(404, "Wallet address entry not found");
        }
        walletAddress.cryptocurrencies.USDT = walletDetails.USDT || walletAddress.cryptocurrencies.USDT;
        walletAddress.cryptocurrencies.BTC = walletDetails.BTC || walletAddress.cryptocurrencies.BTC;
        walletAddress.cryptocurrencies.ETH = walletDetails.ETH || walletAddress.cryptocurrencies.ETH;
        await walletAddress.save();
    }
}
exports.default = DashboardServiceImpl;
