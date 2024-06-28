import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";
import { IUser } from "./user.model";

export interface IDeposit extends Document {
  user: IUser;
  amount: number;
  paymentMethod: string;
  proofOfPayment: string;
  createdAt: Date;
  updatedAt: Date;
};

const depositSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  proofOfPayment: { type: String, required: true },
}, { timestamps: true });

export const Deposit = mongoose.model<IDeposit>("Deposit", depositSchema);
