import Joi from "joi";
import { Gender } from "../enums/gender.enum";

export class RegisterUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  address: string;
  phoneNumber: string;
  gender: Gender;

  static validationSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi
        .string()
        .email()
        .required()
        .messages({
          "string.email": "Please provide a valid email address"
        }),
    password: Joi
        .string()
        .pattern(new RegExp('(?=.*[A-Z])(?=.*[!@#$%^&*])'))
        .min(5)
        .max(16)
        .required()
        .messages({
          "string.pattern.base": "Password must contain at least one uppercase letter and one symbol",
          "string.min": "Password must contain at least 5 characters",
          "string.max": "Password must be at most 16 characters long"
        }),
    country: Joi.string().required(),
    address: Joi.string().min(10).max(100).required().messages({
      "string.min": "Address must contain at least 10 characters",
      "string.max": "Address must be at most 100 characters long"
    }),
    phoneNumber: Joi.string().required(),
    gender: Joi.string().valid(...Object.values(Gender)).required().messages({
      "any.only": "Gender must be male, female or other"
    })
  });

  constructor(data: RegisterUserDto) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
    this.country = data.country;
    this.address = data.address;
    this.phoneNumber = data.phoneNumber;
    this.gender = data.gender;
  }
}
