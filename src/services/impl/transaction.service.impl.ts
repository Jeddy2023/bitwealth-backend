import { CreateDepositDto } from "../../dto/createDeposit.dto";
import { User } from "../../models/user.model";
import { CustomError } from "../../utils/customError.utils";
import { TransactionService } from "../transaction.service";
import Cloudinary from "../../config/cloudinary-config";
import { Deposit } from "../../models/deposit.model";
import { listDepositsDto } from "../../dto/listDeposits.dto";

class TransactionServiceImpl implements TransactionService {

  async listDeposits(page: number, pageSize: number): Promise<listDepositsDto[]> {
    const offset = (page - 1) * pageSize;
    const deposits = await Deposit.find().populate('user').skip(offset).limit(pageSize).sort({ createdAt: -1 });
    return deposits.map(deposit => {
      return {
        fullName: `${deposit.user.firstName} ${deposit.user.lastName}`,
        amount: deposit.amount,
        paymentMethod: deposit.paymentMethod,
        proofOfPayment: deposit.proofOfPayment,
        createdAt: deposit.createdAt
      }
    });
  }

  async deposit(userId: string, createDepositDto: CreateDepositDto): Promise<void> {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, "User not found");
    }

    // upload image to cloudinary
    let result;
    try {
      result = await Cloudinary.v2.uploader.upload(createDepositDto.proofOfPayment);
    } catch (error) {
      throw new CustomError(500, "Failed to upload proof of payment");
    }

    // save deposit transaction
    const deposit = {
      amount: createDepositDto.amount,
      user,
      paymentMethod: createDepositDto.paymentMethod,
      proofOfPayment: result.secure_url
    }

    await Deposit.create(deposit);
  }
}

export default TransactionServiceImpl;