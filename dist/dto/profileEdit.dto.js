"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileEditDto = void 0;
const joi_1 = __importDefault(require("joi"));
class ProfileEditDto {
    constructor(phoneNumber, address) {
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}
exports.ProfileEditDto = ProfileEditDto;
ProfileEditDto.validationSchema = joi_1.default.object({
    phoneNumber: joi_1.default.string().optional(),
    address: joi_1.default.string().optional(),
});
