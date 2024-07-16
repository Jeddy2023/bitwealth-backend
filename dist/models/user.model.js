"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const gender_enum_1 = require("../enums/gender.enum");
;
const UserSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    country: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isTokenized: { type: Boolean, default: false },
    walletBalance: { type: Number, required: true, default: 0 },
    bonusBalance: { type: Number, required: true, default: 30 },
    profitBalance: { type: Number, required: true, default: 0 },
    depositBalance: { type: Number, required: true, default: 0 },
    gender: { type: String, enum: Object.values(gender_enum_1.Gender), required: true },
}, { timestamps: true });
UserSchema.pre('save', function (next) {
    this.walletBalance = this.bonusBalance + this.depositBalance + this.profitBalance;
    next();
});
UserSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.bonusBalance !== undefined || update.depositBalance !== undefined || update.profitBalance !== undefined) {
        update.walletBalance = (update.bonusBalance || 0) + (update.depositBalance || 0) + (update.profitBalance || 0);
        this.setUpdate(update);
    }
    next();
});
exports.User = mongoose_1.default.model("User", UserSchema);
