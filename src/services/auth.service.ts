import { RegisterUserDto } from "../dto/registerUser.dto";

export interface AuthService {
  register(registrationData: RegisterUserDto): Promise<void>,
  login(email: string, password: string): Promise<string>;
}
