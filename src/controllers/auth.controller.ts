import { RegisterUserDto } from "../dto/registerUser.dto";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { AuthService } from "../services/auth.service";
import AuthServiceImpl from "../services/impl/auth.service.impl";
import { Request, Response } from "express";

const authService: AuthService = new AuthServiceImpl();

export const registerController = asyncHandler(async (req: Request, res: Response) => {
  const registerUserDto = new RegisterUserDto(req.body);
  const { error } = RegisterUserDto.validationSchema.validate(registerUserDto);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: "Validation Error", errors: errorMessages });
  }

  await authService.register(registerUserDto);
  return res.status(201).json({ message: "Registration successful" });
});

export const loginController = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { token, user } = await authService.login(email, password);
  return res.status(200).json({ message: "Login successful", token, user });
});
