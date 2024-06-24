"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordDto = void 0;
const joi_1 = __importDefault(require("joi"));
class ChangePasswordDto {
    constructor(data) {
        this.oldPassword = data.oldPassword;
        this.newPassword = data.newPassword;
    }
}
exports.ChangePasswordDto = ChangePasswordDto;
ChangePasswordDto.validationSchema = joi_1.default.object({
    oldPassword: joi_1.default.string().required(),
    newPassword: joi_1.default
        .string()
        .pattern(new RegExp('(?=.*[A-Z])(?=.*[!@#$%^&*])'))
        .min(5)
        .max(16)
        .required()
        .messages({
        "string.pattern.base": "Password must contain at least one uppercase letter and one symbol",
        "string.min": "Password must contain at least 5 characters",
        "string.max": "Password must be at most 16 characters long"
    })
});
