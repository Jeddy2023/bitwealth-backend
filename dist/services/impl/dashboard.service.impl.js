"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../models/user.model");
const deposit_model_1 = require("../../models/deposit.model");
const email_utills_1 = require("../../utils/email.utills");
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
}
exports.default = DashboardServiceImpl;
