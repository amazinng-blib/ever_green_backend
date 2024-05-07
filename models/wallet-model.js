const mongoose = require('mongoose');
const { Schema } = mongoose;

const walletSchema = new mongoose.Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },

    wallet_address: String,
    wallet: { type: String, enum: ['USDT', 'BNB', 'ETH'], default: null },
    withdrawable_balance: { type: Number, default: 0 },
    ledger_balance: { type: Number, default: 0 },
  },

  { timestamps: true }
);

const WalletModel = mongoose.model('Wallet', walletSchema);
module.exports = WalletModel;
