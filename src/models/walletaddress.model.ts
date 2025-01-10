import mongoose, { Schema, Document } from "mongoose";

    export interface IWalletAddress extends Document {
        cryptocurrencies: {
            USDT: string;
            BTC: string;
            ETH: string;
        };
        createdAt: Date;
        updatedAt: Date;
    }

const WalletAddressSchema = new Schema<IWalletAddress>(
    {
        cryptocurrencies: {
            USDT: { type: String, default: "kkdkkdvndkcvdjkeiirgirrrr" },
            BTC: { type: String, default: "kkdkkdvndkcvdjkeiirgirrrr" },
            ETH: { type: String, default: "kkdkkdvndkcvdjkeiirgirrrr" },
        },
    },
    { timestamps: true }
);

export const WalletAddress = mongoose.model<IWalletAddress>("WalletAddress", WalletAddressSchema);
