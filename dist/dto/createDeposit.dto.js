"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDepositDto = void 0;
const joi_1 = __importDefault(require("joi"));
class CreateDepositDto {
    constructor(amount, paymentMethod, proofOfPayment) {
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.proofOfPayment = proofOfPayment;
    }
}
exports.CreateDepositDto = CreateDepositDto;
CreateDepositDto.validationSchema = joi_1.default.object({
    amount: joi_1.default.number().required(),
    paymentMethod: joi_1.default.string().required(),
    proofOfPayment: joi_1.default.string().required()
});
