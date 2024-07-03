export interface UsersDepositsDto {
  id: string;
  amount: number;
  paymentMethod: string;
  proofOfPayment: string;
  transactionId: number;
  createdAt: Date;
}