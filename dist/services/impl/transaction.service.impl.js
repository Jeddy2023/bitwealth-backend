"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../models/user.model");
const customError_utils_1 = require("../../utils/customError.utils");
const cloudinary_config_1 = __importDefault(require("../../config/cloudinary-config"));
const deposit_model_1 = require("../../models/deposit.model");
class TransactionServiceImpl {
    async listUsersDeposits(userId, page, pageSize) {
        const offset = (page - 1) * pageSize;
        const deposits = await deposit_model_1.Deposit.find({ user: userId }).skip(offset).limit(pageSize).sort({ createdAt: -1 });
        return deposits.map(deposit => {
            return {
                id: deposit._id,
                amount: deposit.amount,
                paymentMethod: deposit.paymentMethod,
                proofOfPayment: deposit.proofOfPayment,
                transactionId: deposit.transactionId,
                createdAt: deposit.createdAt
            };
        });
    }
    async listDeposits(page, pageSize) {
        const offset = (page - 1) * pageSize;
        const deposits = await deposit_model_1.Deposit.find().populate('user').skip(offset).limit(pageSize).sort({ createdAt: -1 });
        return deposits.map(deposit => {
            return {
                fullName: `${deposit.user.firstName} ${deposit.user.lastName}`,
                amount: deposit.amount,
                paymentMethod: deposit.paymentMethod,
                proofOfPayment: deposit.proofOfPayment,
                createdAt: deposit.createdAt
            };
        });
    }
    async deposit(userId, createDepositDto) {
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            throw new customError_utils_1.CustomError(404, "User not found");
        }
        // upload image to cloudinary
        let result;
        try {
            result = await cloudinary_config_1.default.v2.uploader.upload(createDepositDto.proofOfPayment);
        }
        catch (error) {
            throw new customError_utils_1.CustomError(500, "Failed to upload proof of payment");
        }
        // save deposit transaction
        const deposit = {
            amount: createDepositDto.amount,
            user,
            paymentMethod: createDepositDto.paymentMethod,
            proofOfPayment: result.secure_url
        };
        await deposit_model_1.Deposit.create(deposit);
    }
}
exports.default = TransactionServiceImpl;
