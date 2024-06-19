import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongoose";
dotenv.config();

export const generateToken = async (userId: ObjectId) => {
  return jwt.sign({ sub: userId }, process.env.JWT_KEY as string, { expiresIn: "1d" });
}
