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
  gender: Gender
  walletBalance: number;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  country: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  walletBalance: { type: Number, required: true, default: 0 },
  gender: { type: String, enum: Object.values(Gender), required: true },
}, { timestamps: true });

export const User = mongoose.model<IUser>("User", UserSchema);
