import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";
import { IUser } from "./user.model";

export interface IDeposit extends Document {
  user: IUser;
  amount: number;
  transactionId: number;
  paymentMethod: string;
  proofOfPayment: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
};

const depositSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  transactionId: { type: Number, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  proofOfPayment: { type: String, required: true },
}, { timestamps: true });

depositSchema.pre<IDeposit>("save", function (next) {
  if (!this.transactionId) {
    this.transactionId = Math.floor(1000000 + Math.random() * 9000000);
  }
  next();
});

export const Deposit = mongoose.model<IDeposit>("Deposit", depositSchema);
