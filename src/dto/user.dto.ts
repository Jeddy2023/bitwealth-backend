export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  walletBalance: number;
  bonusBalance: number;
  profitBalance: number;
  depositBalance: number;
  address: string;
  errorMessage: string;
  errorHeader: string;
  country: string;
  createdAt: Date;
}

