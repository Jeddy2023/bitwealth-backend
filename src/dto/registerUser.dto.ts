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
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    country: Joi.string().required(),
    address: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    gender: Joi.string().valid(...Object.values(Gender)).required()
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
