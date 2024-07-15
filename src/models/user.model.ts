import mongoose, { Document, Schema } from "mongoose";
import { Gender } from "../enums/gender.enum";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  address: string;
  phoneNumber: string;
  isAdmin: boolean;
  isVerified: boolean;
  gender: Gender
  walletBalance: number;
  bonusBalance: number;
  profitBalance: number;
  depositBalance: number;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  country: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  walletBalance: { type: Number, required: true, default: 0 },
  bonusBalance: { type: Number, required: true, default: 30 },
  profitBalance: { type: Number, required: true, default: 0 },
  depositBalance: { type: Number, required: true, default: 0 },
  gender: { type: String, enum: Object.values(Gender), required: true },
}, { timestamps: true });

UserSchema.pre<IUser>('save', function (next) {
  this.walletBalance = this.bonusBalance + this.depositBalance + this.profitBalance;
  next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as any;
  if (update.bonusBalance !== undefined || update.depositBalance !== undefined || update.profitBalance !== undefined) {
    update.walletBalance = (update.bonusBalance || 0) + (update.depositBalance || 0) + (update.profitBalance || 0);
    this.setUpdate(update);
  }
  next();
});

export const User = mongoose.model<IUser>("User", UserSchema);
