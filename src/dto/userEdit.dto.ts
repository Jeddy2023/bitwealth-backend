import { error } from "console";
import Joi from "joi";

export class UserEditDto {
  bonusBalance?: number;
  profitBalance?: number;
  depositBalance?: number;
  errorMessage?: string;
  errorHeader?: string;

  static validationSchema = Joi.object({
    phoneNumber: Joi.string().optional(),
    address: Joi.string().optional(),
    bonusBalance: Joi.number().min(0).optional().messages({
      "number.min": "Bonus balance must be a positive number"
    }),
    profitBalance: Joi.number().min(0).optional().messages({
      "number.min": "Profit balance must be a positive number"
    }),
    depositBalance: Joi.number().min(0).optional().messages({
      "number.min": "Deposit balance must be a positive number"
    }),
    errorMessage: Joi.string().optional(),
    errorHeader: Joi.string().optional(),
  });

  constructor(bonusBalance?: number, profitBalance?: number, depositBalance?: number, errorMessage?: string, errorHeader?: string) {
    this.bonusBalance = bonusBalance;
    this.profitBalance = profitBalance;
    this.depositBalance = depositBalance;
    this.errorMessage = errorMessage;
    this.errorHeader = errorHeader;
  }
}
