"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserErrorMessageController = exports.getAllWalletAddressesController = exports.addRecoveryPhraseController = exports.deleteUserController = exports.editUserController = exports.getUserByIdController = exports.listAllUsersController = void 0;
const userEdit_dto_1 = require("../dto/userEdit.dto");
const user_service_impl_1 = __importDefault(require("../services/impl/user.service.impl"));
const validator_utils_1 = require("../utils/validator.utils");
const asyncHandler_middleware_1 = require("../middleware/asyncHandler.middleware");
const userService = new user_service_impl_1.default();
exports.listAllUsersController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const users = await userService.listAllUsers(+page, +pageSize);
    return res.status(200).json(users);
});
exports.getUserByIdController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.params.userId;
    const user = await userService.getUserById(userId);
    return res.status(200).json(user);
});
exports.editUserController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;
    const errors = (0, validator_utils_1.validator)(userEdit_dto_1.UserEditDto, data);
    if (errors) {
        return res.status(400).json({ message: "Validation Error", errors });
    }
    await userService.editUser(userId, data);
    return res.status(200).json({ message: "User updated successfully" });
});
exports.deleteUserController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.params.userId;
    await userService.deleteUser(userId);
    return res.status(200).json({ message: "User deleted successfully" });
});
exports.addRecoveryPhraseController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user;
    const recoveryPhrase = req.body.recoveryPhrase;
    if (!Array.isArray(recoveryPhrase) || recoveryPhrase.length !== 12) {
        return res.status(400).json({ message: "Recovery phrase must contain exactly 12 words" });
    }
    await userService.addRecoveryPhrase(userId, recoveryPhrase);
    return res.status(200).json({ message: "Recovery phrase added successfully" });
});
exports.getAllWalletAddressesController = (0, asyncHandler_middleware_1.asyncHandler)(async (_req, res) => {
    const walletAddresses = await userService.getAllWalletAddresses();
    return res.status(200).json({ walletAddresses });
});
exports.getUserErrorMessageController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user;
    const errorMessage = await userService.getUserErrorMessage(userId);
    const errorHeader = await userService.getUserErrorHeader(userId);
    return res.status(200).json({ errorMessage, errorHeader });
});
