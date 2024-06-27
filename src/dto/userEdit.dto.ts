import Joi from "joi";

export class UserEditDto {
  walletBalance: number;

  static validationSchema = Joi.object({
    phoneNumber: Joi.string().optional(),
    address: Joi.string().optional(),
    walletBalance: Joi.number().min(0).optional().messages({
      "number.min": "Wallet balance must be a positive number"
    })
  });

  constructor(walletBalance: number) {
    this.walletBalance = walletBalance;
  }
}