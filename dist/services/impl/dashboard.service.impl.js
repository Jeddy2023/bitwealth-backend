"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../models/user.model");
const deposit_model_1 = require("../../models/deposit.model");
class DashboardServiceImpl {
    async getDashboardData() {
        const users = await user_model_1.User.countDocuments();
        const deposits = await deposit_model_1.Deposit.countDocuments();
        return { users, deposits };
    }
}
exports.default = DashboardServiceImpl;
