"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordController = exports.editProfileController = exports.getWalletDetailsController = exports.getProfileController = void 0;
const profile_service_impl_1 = __importDefault(require("../services/impl/profile.service.impl"));
const validator_utils_1 = require("../utils/validator.utils");
const profileEdit_dto_1 = require("../dto/profileEdit.dto");
const changePassword_dto_1 = require("../dto/changePassword.dto");
const asyncHandler_middleware_1 = require("../middleware/asyncHandler.middleware");
const profileService = new profile_service_impl_1.default();
exports.getProfileController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user;
    const userProfile = await profileService.getUserProfile(userId);
    return res.status(200).json({ profileData: userProfile });
});
exports.getWalletDetailsController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user;
    const userWalletDetails = await profileService.getUserWalletDetails(userId);
    return res.status(200).json({ walletDetails: userWalletDetails });
});
exports.editProfileController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user;
    const data = req.body;
    const errors = (0, validator_utils_1.validator)(profileEdit_dto_1.ProfileEditDto, data);
    if (errors)
        return res.status(400).json({ message: "Validation Error", errors });
    await profileService.editProfile(userId, data);
    return res.status(200).json({ message: "Profile updated successfully" });
});
exports.changePasswordController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user;
    const changePasswordDto = new changePassword_dto_1.ChangePasswordDto(req.body);
    const errors = (0, validator_utils_1.validator)(changePassword_dto_1.ChangePasswordDto, changePasswordDto);
    if (errors)
        return res.status(400).json({ message: "Validation Error", errors });
    await profileService.changePassword(userId, changePasswordDto);
    return res.status(200).json({ message: "Password updated successfully" });
});
