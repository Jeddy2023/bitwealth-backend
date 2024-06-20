import Joi from "joi";

export class ChangePasswordDto {
  oldPassword: string;
  newPassword: string;

  static validationSchema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi
        .string()
        .pattern(new RegExp('(?=.*[A-Z])(?=.*[!@#$%^&*])'))
        .min(5)
        .max(16)
        .required()
        .messages({
          "string.pattern.base": "Password must contain at least one uppercase letter and one symbol",
          "string.min": "Password must contain at least 5 characters",
          "string.max": "Password must be at most 16 characters long"
        })
  });

  constructor(data: ChangePasswordDto) {
    this.oldPassword = data.oldPassword;
    this.newPassword = data.newPassword;
  }
}