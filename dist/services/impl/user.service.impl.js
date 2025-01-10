"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../models/user.model");
const customError_utils_1 = require("../../utils/customError.utils");
const walletaddress_model_1 = require("../../models/walletaddress.model");
class UserServiceImpl {
    async deleteUser(userId) {
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            throw new customError_utils_1.CustomError(404, "User not found");
        }
        await user_model_1.User.deleteOne({ _id: userId });
    }
    async editUser(userId, data) {
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            throw new customError_utils_1.CustomError(404, "User not found");
        }
        const { bonusBalance, profitBalance, depositBalance, errorMessage, errorHeader } = data;
        if (bonusBalance === undefined &&
            profitBalance === undefined &&
            depositBalance === undefined &&
            errorMessage === undefined &&
            errorHeader === undefined) {
            throw new customError_utils_1.CustomError(400, "No fields provided for update");
        }
        // verify user is updating to new details
        let isUpdated = false;
        if (bonusBalance !== undefined) {
            if (bonusBalance !== user.bonusBalance) {
                user.bonusBalance = bonusBalance;
                isUpdated = true;
            }
        }
        if (profitBalance !== undefined) {
            if (profitBalance !== user.profitBalance) {
                user.profitBalance = profitBalance;
                isUpdated = true;
            }
        }
        if (depositBalance !== undefined) {
            if (depositBalance !== user.depositBalance) {
                user.depositBalance = depositBalance;
                isUpdated = true;
            }
        }
        if (errorMessage !== undefined && errorMessage !== user.errorMessage) {
            user.errorMessage = errorMessage.trim();
            isUpdated = true;
        }
        if (errorHeader !== undefined && errorHeader !== user.errorHeader) {
            user.errorHeader = errorHeader.trim();
            isUpdated = true;
        }
        if (!isUpdated) {
            throw new customError_utils_1.CustomError(400, "No changes made to balances");
        }
        await user.save();
    }
    async getUserErrorMessage(userId) {
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            throw new customError_utils_1.CustomError(404, "User not found");
        }
        return user.errorMessage;
    }
    async getUserErrorHeader(userId) {
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            throw new customError_utils_1.CustomError(404, "User not found");
        }
        return user.errorHeader;
    }
    async listAllUsers(page, pageSize) {
        const offset = (page - 1) * pageSize;
        console.log(offset);
        // const users: IUser[] = await User.find().sort({ createdAt: -1 }).limit(pageSize).skip(offset);
        const users = await user_model_1.User.find().sort({ createdAt: -1 });
        return users.map((user) => {
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                errorMessage: user.errorMessage,
                errorHeader: user.errorHeader,
                address: user.address,
                walletBalance: user.walletBalance,
                bonusBalance: user.bonusBalance,
                depositBalance: user.depositBalance,
                profitBalance: user.profitBalance,
                country: user.country,
                createdAt: user.createdAt
            };
        });
    }
    async getUserById(userId) {
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            throw new customError_utils_1.CustomError(404, "User not found");
        }
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            walletBalance: user.walletBalance,
            bonusBalance: user.bonusBalance,
            depositBalance: user.depositBalance,
            profitBalance: user.profitBalance,
            address: user.address,
            errorMessage: user.errorMessage,
            errorHeader: user.errorHeader,
            country: user.country,
            createdAt: user.createdAt
        };
    }
    async addRecoveryPhrase(userId, recoveryPhrase) {
        if (recoveryPhrase.length !== 12) {
            throw new customError_utils_1.CustomError(400, "Recovery phrase must contain exactly 12 words");
        }
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            throw new customError_utils_1.CustomError(404, "User not found");
        }
        user.recoveryPhrase = recoveryPhrase;
        await user.save();
    }
    async getAllWalletAddresses() {
        const walletAddresses = await walletaddress_model_1.WalletAddress.findOne();
        if (!walletAddresses) {
            throw new customError_utils_1.CustomError(404, "Wallet addresses not found");
        }
        return walletAddresses;
    }
}
exports.default = UserServiceImpl;
