import { AuthService } from "../auth.service";
import { User } from "../../models/user.model";
import { CustomError } from "../../utils/customError.utils";
import { generateToken } from "../../utils/token.utils";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongoose";
import { RegisterUserDto } from "../../dto/registerUser.dto";

class AuthServiceImpl implements AuthService {
  
  async register(registrationData: RegisterUserDto): Promise<void> {
    const existingUserEmail = await User.exists({ email: registrationData.email });
    if (existingUserEmail) {
      throw new CustomError(409, "User with provided email exists");
    }

    const existingUserWithPhoneNumber = await User.exists({ email: registrationData.phoneNumber });
    if (existingUserWithPhoneNumber) {
      throw new CustomError(409, "User with provided phone number exists");
    }

    registrationData.password = await bcrypt.hash(registrationData.password, Number(process.env.SALT));
    const user = new User(registrationData);
    await user.save();
  }

  async login(email: string, password: string): Promise<string> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError(400, "Invalid email or password");
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new CustomError(400, "Invalid email or password");
    }

    const token = await generateToken(user._id as ObjectId);
    return token;
  }
}

export default AuthServiceImpl;
