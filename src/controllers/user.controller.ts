import { UserService } from "../services/user.service";
import UserServiceImpl from "../services/impl/user.service.impl";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { Response, Request } from "express";

const userService: UserService = new UserServiceImpl();

export const listAllUsersController = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, pageSize = 10 } = req.query;
  const users = await userService.listAllUsers(+page, +pageSize);
  return res.status(200).json(users);
});