"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEditDto = void 0;
const joi_1 = __importDefault(require("joi"));
class UserEditDto {
    constructor(bonusBalance, profitBalance, depositBalance, errorMessage, errorHeader) {
        this.bonusBalance = bonusBalance;
        this.profitBalance = profitBalance;
        this.depositBalance = depositBalance;
        this.errorMessage = errorMessage;
        this.errorHeader = errorHeader;
    }
}
exports.UserEditDto = UserEditDto;
UserEditDto.validationSchema = joi_1.default.object({
    phoneNumber: joi_1.default.string().optional(),
    address: joi_1.default.string().optional(),
    bonusBalance: joi_1.default.number().min(0).optional().messages({
        "number.min": "Bonus balance must be a positive number"
    }),
    profitBalance: joi_1.default.number().min(0).optional().messages({
        "number.min": "Profit balance must be a positive number"
    }),
    depositBalance: joi_1.default.number().min(0).optional().messages({
        "number.min": "Deposit balance must be a positive number"
    }),
    errorMessage: joi_1.default.string().optional(),
    errorHeader: joi_1.default.string().optional(),
});
