import Joi from "joi";

export class ProfileEditDto {
  phoneNumber: string;
  address: string;

  static validationSchema = Joi.object({
    phoneNumber: Joi.string().optional(),
    address: Joi.string().optional(),
  });

  constructor(phoneNumber: string, address: string) {
    this.phoneNumber = phoneNumber;
    this.address = address;
  }
}