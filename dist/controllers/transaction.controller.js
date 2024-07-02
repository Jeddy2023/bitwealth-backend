"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listDepositsController = exports.createDepositController = void 0;
const transaction_service_impl_1 = __importDefault(require("../services/impl/transaction.service.impl"));
const createDeposit_dto_1 = require("../dto/createDeposit.dto");
const asyncHandler_middleware_1 = require("../middleware/asyncHandler.middleware");
const validator_utils_1 = require("../utils/validator.utils");
const transactionService = new transaction_service_impl_1.default();
exports.createDepositController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user;
    // Check if proof Of Payment is present
    if (!req.file)
        return res.status(400).json({ message: "Validation Error", errors: ["Proof of payment is required as PNG, JPG or JPEG!"], });
    const createDepositDto = new createDeposit_dto_1.CreateDepositDto(req.body.amount, req.body.paymentMethod, req.file.path);
    const errors = (0, validator_utils_1.validator)(createDeposit_dto_1.CreateDepositDto, createDepositDto);
    if (errors)
        return res.status(400).json({ message: "Validation Error", errors });
    await transactionService.deposit(userId, createDepositDto);
    return res.status(201).json({ message: "Deposit created successfully" });
});
exports.listDepositsController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const deposits = await transactionService.listDeposits(page, pageSize);
    return res.status(200).json(deposits);
});
