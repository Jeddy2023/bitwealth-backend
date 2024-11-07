"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserDto = void 0;
const joi_1 = __importDefault(require("joi"));
const gender_enum_1 = require("../enums/gender.enum");
class RegisterUserDto {
    constructor(data) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.password = data.password;
        this.country = data.country;
        this.address = data.address;
        this.phoneNumber = data.phoneNumber;
        this.gender = data.gender;
    }
}
exports.RegisterUserDto = RegisterUserDto;
RegisterUserDto.validationSchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default
        .string()
        .email()
        .required()
        .messages({
        "string.email": "Please provide a valid email address"
    }),
    password: joi_1.default
        .string()
        .pattern(new RegExp(/^(?=.*[A-Z])(?=.*[\W_]).{5,}$/))
        .min(5)
        .max(16)
        .required()
        .messages({
        "string.pattern.base": "Password must contain at least one uppercase letter and one symbol",
        "string.min": "Password must contain at least 5 characters",
        "string.max": "Password must be at most 16 characters long"
    }),
    country: joi_1.default.string().required(),
    address: joi_1.default.string().min(10).max(100).required().messages({
        "string.min": "Address must contain at least 10 characters",
        "string.max": "Address must be at most 100 characters long"
    }),
    phoneNumber: joi_1.default.string().required(),
    gender: joi_1.default.string().valid(...Object.values(gender_enum_1.Gender)).required().messages({
        "any.only": "Gender must be male, female or other"
    })
});
