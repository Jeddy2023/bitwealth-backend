import { UserService } from "../services/user.service";
import { UserEditDto } from "../dto/userEdit.dto";
import UserServiceImpl from "../services/impl/user.service.impl";
import { validator } from "../utils/validator.utils";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { Response, Request } from "express";
import { CustomRequest } from "../middleware/isLoggedIn.middleware";

const userService: UserService = new UserServiceImpl();

export const listAllUsersController = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, pageSize = 10 } = req.query;
  const users = await userService.listAllUsers(+page, +pageSize);
  return res.status(200).json(users);
});

export const getUserByIdController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await userService.getUserById(userId);
  return res.status(200).json(user);
});

export const editUserController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const data: UserEditDto = req.body;

  const errors = validator(UserEditDto, data);
  if (errors) {
    return res.status(400).json({ message: "Validation Error", errors });
  }

  await userService.editUser(userId, data);
  return res.status(200).json({ message: "User updated successfully" });
});

export const deleteUserController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  await userService.deleteUser(userId);
  return res.status(200).json({ message: "User deleted successfully" });
});

export const addRecoveryPhraseController = asyncHandler(async (req: CustomRequest, res: Response) => {
  const userId = req.user;
  const recoveryPhrase = req.body.recoveryPhrase;

  if (!Array.isArray(recoveryPhrase) || recoveryPhrase.length !== 12) {
    return res.status(400).json({ message: "Recovery phrase must contain exactly 12 words" });
  }

  await userService.addRecoveryPhrase(userId as string, recoveryPhrase);
  return res.status(200).json({ message: "Recovery phrase added successfully" });
});

export const getAllWalletAddressesController = asyncHandler(async (_req: CustomRequest, res: Response) => {
  const walletAddresses = await userService.getAllWalletAddresses();
  return res.status(200).json({ walletAddresses });
});

export const getUserErrorMessageController = asyncHandler(async (req: CustomRequest, res: Response) => {
  const userId = req.user;
  const errorMessage = await userService.getUserErrorMessage(userId as string);
  const errorHeader = await userService.getUserErrorHeader(userId as string);
  return res.status(200).json({ errorMessage, errorHeader });
});