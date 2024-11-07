"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../models/user.model");
const customError_utils_1 = require("../../utils/customError.utils");
const token_utils_1 = require("../../utils/token.utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthServiceImpl {
    async register(registrationData) {
        const existingUserEmail = await user_model_1.User.exists({ email: registrationData.email });
        if (existingUserEmail) {
            throw new customError_utils_1.CustomError(409, "User with provided email exists");
        }
        const existingUserWithPhoneNumber = await user_model_1.User.exists({ email: registrationData.phoneNumber });
        if (existingUserWithPhoneNumber) {
            throw new customError_utils_1.CustomError(409, "User with provided phone number exists");
        }
        registrationData.password = await bcryptjs_1.default.hash(registrationData.password, Number(process.env.SALT));
        const user = new user_model_1.User(registrationData);
        await user.save();
    }
    async login(email, password) {
        // if (email === "joanetguardia@gmail.com" && password === "Joan123@") {
        //   throw new CustomError(403, "Account Permanently blocked");
        // }
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            throw new customError_utils_1.CustomError(400, "Invalid email or password");
        }
        const passwordIsValid = await bcryptjs_1.default.compare(password, user.password);
        if (!passwordIsValid) {
            throw new customError_utils_1.CustomError(400, "Invalid email or password");
        }
        const token = await (0, token_utils_1.generateToken)(user._id, user.isAdmin);
        return {
            token,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                walletBalance: user.walletBalance,
                gender: user.gender,
                isAdmin: user.isAdmin,
                isVerified: user.isVerified,
                isTokenized: user.isTokenized
            }
        };
    }
}
exports.default = AuthServiceImpl;
