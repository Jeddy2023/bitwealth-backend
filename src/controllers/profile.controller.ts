import { Response } from "express";
import { CustomRequest } from "../middleware/isLoggedIn.middleware";
import ProfileServiceImpl from "../services/impl/profile.service.impl";
import { ProfileDto } from "../dto/profile.dto";
import { validator } from "../utils/validator.utils";
import { ProfileEditDto } from "../dto/profileEdit.dto";
import { ChangePasswordDto } from "../dto/changePassword.dto";
import { asyncHandler } from "../middleware/asyncHandler.middleware";

const profileService: ProfileServiceImpl = new ProfileServiceImpl();

export const getProfileController = asyncHandler(async (req: CustomRequest, res: Response) => {
  const userId = req.user;
  const userProfile: ProfileDto = await profileService.getUserProfile(userId as string);
  return res.status(200).json({ profileData: userProfile });
});

export const editProfileController = asyncHandler(async (req: CustomRequest, res: Response) => {
  const userId = req.user;
  const data = req.body;
  const errors = validator(ProfileEditDto, data);
  if (errors) return res.status(400).json({ message: "Validation Error", errors }); 
  await profileService.editProfile(userId as string, data);
  return res.status(200).json({ message: "Profile updated successfully" });
});

export const changePasswordController = asyncHandler(async (req: CustomRequest, res: Response) => {
  const userId = req.user;
  const changePasswordDto = new ChangePasswordDto(req.body);
  const errors = validator(ChangePasswordDto, changePasswordDto);
  if (errors) return res.status(400).json({ message: "Validation Error", errors });
  await profileService.changePassword(userId as string, changePasswordDto);
  return res.status(200).json({ message: "Password updated successfully" });
});