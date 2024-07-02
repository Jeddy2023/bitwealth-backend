"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../models/user.model");
const customError_utils_1 = require("../../utils/customError.utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class ProfileServiceImpl {
    async changePassword(userId, data) {
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            throw new customError_utils_1.CustomError(404, "User not found");
        }
        const isMatch = await bcryptjs_1.default.compare(data.oldPassword, user.password);
        if (!isMatch) {
            throw new customError_utils_1.CustomError(400, "Invalid old password");
        }
        // verify that user is updating to new details
        if (data.oldPassword === data.newPassword) {
            throw new customError_utils_1.CustomError(400, "New password cannot be same as old");
        }
        user.password = await bcryptjs_1.default.hash(data.newPassword, Number(process.env.SALT));
        await user.save();
    }
    async editProfile(userId, data) {
        const { phoneNumber, address } = data;
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            throw new customError_utils_1.CustomError(404, "User not found");
        }
        // check that user updates to new details
        if (phoneNumber === user.phoneNumber) {
            throw new customError_utils_1.CustomError(400, "New phone number cannot be same as old");
        }
        if (address === user.address) {
            throw new customError_utils_1.CustomError(400, "New address cannot be same as old");
        }
        // update details
        if (phoneNumber)
            user.phoneNumber = phoneNumber;
        if (address)
            user.address = address;
        await user.save();
    }
    async getUserProfile(userId) {
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            throw new customError_utils_1.CustomError(404, "User not found");
        }
        return {
            fullName: `${user.firstName} ${user.lastName}`,
            displayName: `${user.firstName}`,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address
        };
    }
    async getUserWalletDetails(userId) {
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            throw new customError_utils_1.CustomError(404, "User not found");
        }
        return {
            walletBalance: user.walletBalance,
            bonusBalance: user.bonusBalance,
            profitBalance: user.profitBalance,
            depositBalance: user.depositBalance,
        };
    }
}
exports.default = ProfileServiceImpl;
