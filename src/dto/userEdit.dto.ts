import Joi from "joi";

export class UserEditDto {
  bonusBalance?: number;
  profitBalance?: number;
  depositBalance?: number;

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
  });

  constructor(bonusBalance?: number, profitBalance?: number, depositBalance?: number) {
    this.bonusBalance = bonusBalance;
    this.profitBalance = profitBalance;
    this.depositBalance = depositBalance;
  }
}
