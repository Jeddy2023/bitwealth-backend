import joi from "joi";

export class CreateDepositDto {
  amount: number;
  paymentMethod: string;
  proofOfPayment: string;

  static validationSchema = joi.object({
    amount: joi.number().required(),
    paymentMethod: joi.string().required(),
    proofOfPayment: joi.string().required()
  });

  constructor(amount: number, paymentMethod: string, proofOfPayment: string) {
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.proofOfPayment = proofOfPayment;
  }
}
